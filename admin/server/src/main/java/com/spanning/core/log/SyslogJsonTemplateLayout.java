package com.spanning.core.log;

import java.nio.charset.Charset;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Supplier;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.core.Layout;
import org.apache.logging.log4j.core.LogEvent;
import org.apache.logging.log4j.core.StringLayout;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.Node;
import org.apache.logging.log4j.core.config.plugins.Plugin;
import org.apache.logging.log4j.core.config.plugins.PluginBuilderAttribute;
import org.apache.logging.log4j.core.config.plugins.PluginBuilderFactory;
import org.apache.logging.log4j.core.config.plugins.PluginConfiguration;
import org.apache.logging.log4j.core.config.plugins.PluginElement;
import org.apache.logging.log4j.core.layout.ByteBufferDestination;
import org.apache.logging.log4j.core.layout.Encoder;
import org.apache.logging.log4j.core.layout.LockingStringBuilderEncoder;
import org.apache.logging.log4j.core.layout.StringBuilderEncoder;
import org.apache.logging.log4j.core.util.Constants;
import org.apache.logging.log4j.core.util.StringEncoder;
import org.apache.logging.log4j.layout.template.json.JsonTemplateLayout.EventTemplateAdditionalField;
import org.apache.logging.log4j.layout.template.json.JsonTemplateLayoutDefaults;
import org.apache.logging.log4j.layout.template.json.resolver.EventResolverContext;
import org.apache.logging.log4j.layout.template.json.resolver.EventResolverFactories;
import org.apache.logging.log4j.layout.template.json.resolver.EventResolverFactory;
import org.apache.logging.log4j.layout.template.json.resolver.EventResolverInterceptor;
import org.apache.logging.log4j.layout.template.json.resolver.EventResolverInterceptors;
import org.apache.logging.log4j.layout.template.json.resolver.EventResolverStringSubstitutor;
import org.apache.logging.log4j.layout.template.json.resolver.TemplateResolver;
import org.apache.logging.log4j.layout.template.json.resolver.TemplateResolvers;
import org.apache.logging.log4j.layout.template.json.util.JsonWriter;
import org.apache.logging.log4j.layout.template.json.util.Recycler;
import org.apache.logging.log4j.layout.template.json.util.RecyclerFactory;
import org.apache.logging.log4j.layout.template.json.util.Uris;
import org.apache.logging.log4j.util.Strings;

@Plugin(
    name = "SyslogJsonTemplateLayout",
    category = Node.CATEGORY,
    elementType = Layout.ELEMENT_TYPE
)
public class SyslogJsonTemplateLayout implements StringLayout {

  public static final String MDC_KEY_MESSAGE_SOURCE = "messageSource";

  private static final Map<String, String> CONTENT_FORMAT = Collections.singletonMap("version", "1");
  private final Charset charset;
  private final String contentType;
  private final TemplateResolver<LogEvent> eventResolver;
  private final String eventDelimiter;
  private final Recycler<Context> contextRecycler;

  private SyslogJsonTemplateLayout(final Builder builder) {
    this.charset = builder.charset;
    this.contentType = "application/json; charset=" + charset;
    final String eventDelimiterSuffix = builder.isNullEventDelimiterEnabled() ? "\0" : "";
    this.eventDelimiter = builder.eventDelimiter + eventDelimiterSuffix;
    final Configuration configuration = builder.configuration;
    final JsonWriter jsonWriter = JsonWriter
        .newBuilder()
        .setMaxStringLength(builder.maxStringLength)
        .setTruncatedStringSuffix(builder.truncatedStringSuffix)
        .build();
    this.eventResolver = createEventResolver(
        builder,
        configuration,
        charset,
        jsonWriter);
    this.contextRecycler = createContextRecycler(builder, jsonWriter);
  }

  private TemplateResolver<LogEvent> createEventResolver(
      final Builder builder,
      final Configuration configuration,
      final Charset charset,
      final JsonWriter jsonWriter
  ) {
    final List<String> pluginPackages = configuration.getPluginPackages();
    final Map<String, EventResolverFactory> resolverFactoryByName =
        EventResolverFactories.populateResolverFactoryByName(pluginPackages);
    final List<EventResolverInterceptor> resolverInterceptors =
        EventResolverInterceptors.populateInterceptors(pluginPackages);
    final EventResolverStringSubstitutor substitutor =
        new EventResolverStringSubstitutor(configuration.getStrSubstitutor());
    final String eventTemplate = readEventTemplate(builder);
    final String stackTraceElementTemplate = readStackTraceElementTemplate(builder);
    final float maxByteCountPerChar = builder.charset.newEncoder().maxBytesPerChar();
    final int maxStringByteCount =
        Math.toIntExact(Math.round(Math.ceil(maxByteCountPerChar * builder.maxStringLength)));
    final EventTemplateAdditionalField[] eventTemplateAdditionalFields =
        builder.eventTemplateAdditionalFields != null
        ? builder.eventTemplateAdditionalFields
        : new EventTemplateAdditionalField[0];
    final EventResolverContext resolverContext = EventResolverContext
        .newBuilder()
        .setConfiguration(configuration)
        .setResolverFactoryByName(resolverFactoryByName)
        .setResolverInterceptors(resolverInterceptors)
        .setSubstitutor(substitutor)
        .setCharset(charset)
        .setJsonWriter(jsonWriter)
        .setRecyclerFactory(builder.recyclerFactory)
        .setMaxStringByteCount(maxStringByteCount)
        .setTruncatedStringSuffix(builder.truncatedStringSuffix)
        .setLocationInfoEnabled(builder.locationInfoEnabled)
        .setStackTraceEnabled(builder.stackTraceEnabled)
        .setStackTraceElementTemplate(stackTraceElementTemplate)
        .setEventTemplateRootObjectKey(builder.eventTemplateRootObjectKey)
        .setEventTemplateAdditionalFields(eventTemplateAdditionalFields)
        .build();
    return TemplateResolvers.ofTemplate(resolverContext, eventTemplate);
  }

  private static String readEventTemplate(final Builder builder) {
    return readTemplate(
        builder.eventTemplate,
        builder.eventTemplateUri,
        builder.charset);
  }

  private static String readStackTraceElementTemplate(final Builder builder) {
    return readTemplate(
        builder.stackTraceElementTemplate,
        builder.stackTraceElementTemplateUri,
        builder.charset);
  }

  private static String readTemplate(
      final String template,
      final String templateUri,
      final Charset charset
  ) {
    return Strings.isBlank(template)
           ? Uris.readUri(templateUri, charset)
           : template;
  }

  private static Recycler<Context> createContextRecycler(
      final Builder builder,
      final JsonWriter jsonWriter
  ) {
    final Supplier<Context> supplier =
        createContextSupplier(builder.charset, jsonWriter);
    return builder
        .recyclerFactory
        .create(supplier, Context::close);
  }

  private static Supplier<Context> createContextSupplier(
      final Charset charset,
      final JsonWriter jsonWriter
  ) {
    return () -> {
      final JsonWriter clonedJsonWriter = jsonWriter.clone();
      final Encoder<StringBuilder> encoder = createStringBuilderEncoder(charset);
      return new Context(clonedJsonWriter, encoder);
    };
  }

  private static Encoder<StringBuilder> createStringBuilderEncoder(final Charset charset) {
    if (Constants.ENABLE_DIRECT_ENCODERS) {
      return Constants.ENABLE_THREADLOCALS
             ? new StringBuilderEncoder(charset)
             : new LockingStringBuilderEncoder(charset);
    }
    return null;
  }

  @Override
  public byte[] toByteArray(final LogEvent event) {
    final String eventJson = toSerializable(event);
    final String name = getSyslogTagName(event);
    final String workerPortSuffix = Optional.ofNullable(System.getenv("WORKER_PORT"))
        .filter(StringUtils::isNotBlank)
        .map(s -> "_" + s + ".log")
        .orElse(".log");

    final String syslogPrefixedJson = name + workerPortSuffix + ":" + eventJson;
    return StringEncoder.toBytes(syslogPrefixedJson, charset);
  }

  private String getSyslogTagName(final LogEvent event) {
    return Optional.ofNullable(System.getenv("PROCESS_NAME"))
        .filter(StringUtils::isNotBlank)
        .or(() -> this.getMdcMessageSource(event))
        .or(this::getLogSuffixParam)
        .orElse(StringUtils.EMPTY);
  }

  private Optional<String> getMdcMessageSource(final LogEvent event) {
    return Optional.ofNullable(event)
        .map(LogEvent::getContextData)
        .map(map -> (String) map.getValue(MDC_KEY_MESSAGE_SOURCE))
        .filter(StringUtils::isNotBlank);
  }

  private Optional<String> getLogSuffixParam() {
    return Optional.ofNullable(System.getProperty("log.file.suffix"))
        .filter(StringUtils::isNotBlank);
  }

  @Override
  public String toSerializable(final LogEvent event) {
    final Context context = acquireContext();
    final JsonWriter jsonWriter = context.jsonWriter;
    final StringBuilder stringBuilder = jsonWriter.getStringBuilder();
    try {
      eventResolver.resolve(event, jsonWriter);
      stringBuilder.append(eventDelimiter);
      return stringBuilder.toString();
    } finally {
      contextRecycler.release(context);
    }
  }

  @Override
  public void encode(
      final LogEvent event,
      final ByteBufferDestination destination
  ) {

    // Acquire a context.
    final Context context = acquireContext();
    final JsonWriter jsonWriter = context.jsonWriter;
    final StringBuilder stringBuilder = jsonWriter.getStringBuilder();
    final Encoder<StringBuilder> encoder = context.encoder;

    try {

      // Render the JSON.
      eventResolver.resolve(event, jsonWriter);
      stringBuilder.append(eventDelimiter);

      // Write to the destination.
      if (encoder == null) {
        final String eventJson = stringBuilder.toString();
        final byte[] eventJsonBytes = StringEncoder.toBytes(eventJson, charset);
        destination.writeBytes(eventJsonBytes, 0, eventJsonBytes.length);
      } else {
        encoder.encode(stringBuilder, destination);
      }
    } finally {
      contextRecycler.release(context);
    }
  }

  // Visible for tests.
  Context acquireContext() {
    return contextRecycler.acquire();
  }

  @Override
  public byte[] getFooter() {
    return null;
  }

  @Override
  public byte[] getHeader() {
    return null;
  }

  @Override
  public Charset getCharset() {
    return charset;
  }

  @Override
  public String getContentType() {
    return contentType;
  }

  @Override
  public Map<String, String> getContentFormat() {
    return CONTENT_FORMAT;
  }

  @PluginBuilderFactory
  @SuppressWarnings("WeakerAccess")
  public static Builder newBuilder() {
    return new Builder();
  }

  @SuppressWarnings({"unused", "WeakerAccess"})
  @NoArgsConstructor(access = AccessLevel.PRIVATE)
  public static final class Builder
      implements org.apache.logging.log4j.core.util.Builder<SyslogJsonTemplateLayout> {

    @PluginConfiguration
    private Configuration configuration;

    @PluginBuilderAttribute
    private Charset charset = JsonTemplateLayoutDefaults.getCharset();

    @PluginBuilderAttribute
    private boolean locationInfoEnabled =
        JsonTemplateLayoutDefaults.isLocationInfoEnabled();

    @PluginBuilderAttribute
    private boolean stackTraceEnabled =
        JsonTemplateLayoutDefaults.isStackTraceEnabled();

    @PluginBuilderAttribute
    private String eventTemplate = JsonTemplateLayoutDefaults.getEventTemplate();

    @PluginBuilderAttribute
    private String eventTemplateUri =
        JsonTemplateLayoutDefaults.getEventTemplateUri();

    @PluginBuilderAttribute
    private String eventTemplateRootObjectKey =
        JsonTemplateLayoutDefaults.getEventTemplateRootObjectKey();

    @PluginElement("EventTemplateAdditionalField")
    private EventTemplateAdditionalField[] eventTemplateAdditionalFields;

    @PluginBuilderAttribute
    private String stackTraceElementTemplate =
        JsonTemplateLayoutDefaults.getStackTraceElementTemplate();

    @PluginBuilderAttribute
    private String stackTraceElementTemplateUri =
        JsonTemplateLayoutDefaults.getStackTraceElementTemplateUri();

    @PluginBuilderAttribute
    private String eventDelimiter = JsonTemplateLayoutDefaults.getEventDelimiter();

    @PluginBuilderAttribute
    private boolean nullEventDelimiterEnabled =
        JsonTemplateLayoutDefaults.isNullEventDelimiterEnabled();

    @PluginBuilderAttribute
    private int maxStringLength = JsonTemplateLayoutDefaults.getMaxStringLength();

    @PluginBuilderAttribute
    private String truncatedStringSuffix =
        JsonTemplateLayoutDefaults.getTruncatedStringSuffix();

    @PluginBuilderAttribute
    private RecyclerFactory recyclerFactory =
        JsonTemplateLayoutDefaults.getRecyclerFactory();

    public Configuration getConfiguration() {
      return configuration;
    }

    public Builder setConfiguration(final Configuration configuration) {
      this.configuration = configuration;
      return this;
    }

    public Charset getCharset() {
      return charset;
    }

    public Builder setCharset(final Charset charset) {
      this.charset = charset;
      return this;
    }

    public boolean isLocationInfoEnabled() {
      return locationInfoEnabled;
    }

    public Builder setLocationInfoEnabled(final boolean locationInfoEnabled) {
      this.locationInfoEnabled = locationInfoEnabled;
      return this;
    }

    public boolean isStackTraceEnabled() {
      return stackTraceEnabled;
    }

    public Builder setStackTraceEnabled(final boolean stackTraceEnabled) {
      this.stackTraceEnabled = stackTraceEnabled;
      return this;
    }

    public String getEventTemplate() {
      return eventTemplate;
    }

    public Builder setEventTemplate(final String eventTemplate) {
      this.eventTemplate = eventTemplate;
      return this;
    }

    public String getEventTemplateUri() {
      return eventTemplateUri;
    }

    public Builder setEventTemplateUri(final String eventTemplateUri) {
      this.eventTemplateUri = eventTemplateUri;
      return this;
    }

    public String getEventTemplateRootObjectKey() {
      return eventTemplateRootObjectKey;
    }

    public Builder setEventTemplateRootObjectKey(final String eventTemplateRootObjectKey) {
      this.eventTemplateRootObjectKey = eventTemplateRootObjectKey;
      return this;
    }

    public EventTemplateAdditionalField[] getEventTemplateAdditionalFields() {
      return eventTemplateAdditionalFields;
    }

    public Builder setEventTemplateAdditionalFields(
        final EventTemplateAdditionalField[] eventTemplateAdditionalFields
    ) {
      this.eventTemplateAdditionalFields = eventTemplateAdditionalFields;
      return this;
    }

    public String getStackTraceElementTemplate() {
      return stackTraceElementTemplate;
    }

    public Builder setStackTraceElementTemplate(
        final String stackTraceElementTemplate
    ) {
      this.stackTraceElementTemplate = stackTraceElementTemplate;
      return this;
    }

    public String getStackTraceElementTemplateUri() {
      return stackTraceElementTemplateUri;
    }

    public Builder setStackTraceElementTemplateUri(
        final String stackTraceElementTemplateUri
    ) {
      this.stackTraceElementTemplateUri = stackTraceElementTemplateUri;
      return this;
    }

    public String getEventDelimiter() {
      return eventDelimiter;
    }

    public Builder setEventDelimiter(final String eventDelimiter) {
      this.eventDelimiter = eventDelimiter;
      return this;
    }

    public boolean isNullEventDelimiterEnabled() {
      return nullEventDelimiterEnabled;
    }

    public Builder setNullEventDelimiterEnabled(
        final boolean nullEventDelimiterEnabled
    ) {
      this.nullEventDelimiterEnabled = nullEventDelimiterEnabled;
      return this;
    }

    public int getMaxStringLength() {
      return maxStringLength;
    }

    public Builder setMaxStringLength(final int maxStringLength) {
      this.maxStringLength = maxStringLength;
      return this;
    }

    public String getTruncatedStringSuffix() {
      return truncatedStringSuffix;
    }

    public Builder setTruncatedStringSuffix(final String truncatedStringSuffix) {
      this.truncatedStringSuffix = truncatedStringSuffix;
      return this;
    }

    public RecyclerFactory getRecyclerFactory() {
      return recyclerFactory;
    }

    public Builder setRecyclerFactory(final RecyclerFactory recyclerFactory) {
      this.recyclerFactory = recyclerFactory;
      return this;
    }

    @Override
    public SyslogJsonTemplateLayout build() {
      validate();
      return new SyslogJsonTemplateLayout(this);
    }

    private void validate() {
      Objects.requireNonNull(configuration, "config");

      if (StringUtils.isAllBlank(eventTemplate, eventTemplateUri)) {
        throw new IllegalArgumentException("both eventTemplate and eventTemplateUri are blank");
      }
      if (stackTraceEnabled && StringUtils.isAllBlank(stackTraceElementTemplate, stackTraceElementTemplateUri)) {
        throw new IllegalArgumentException("both stackTraceElementTemplate and stackTraceElementTemplateUri are blank");
      }
      if (maxStringLength <= 0) {
        throw new IllegalArgumentException("was expecting a non-zero positive maxStringLength: " + maxStringLength);
      }
      Objects.requireNonNull(truncatedStringSuffix, "truncatedStringSuffix");
      Objects.requireNonNull(recyclerFactory, "recyclerFactory");
    }
  }

  static final class Context implements AutoCloseable {

    final JsonWriter jsonWriter;
    final Encoder<StringBuilder> encoder;

    private Context(
        final JsonWriter jsonWriter,
        final Encoder<StringBuilder> encoder
    ) {
      this.jsonWriter = jsonWriter;
      this.encoder = encoder;
    }

    @Override
    public void close() {
      jsonWriter.close();
    }
  }
}
