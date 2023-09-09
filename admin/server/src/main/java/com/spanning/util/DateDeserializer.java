package com.spanning.util;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class DateDeserializer extends StdDeserializer<LocalDate> {

  public DateDeserializer() {
    this(null);
  }

  public DateDeserializer(final Class<?> vc) {
    super(vc);
  }

  @Override
  public LocalDate deserialize(
    final JsonParser jsonparser,
    final DeserializationContext context
  ) throws IOException {
    return Instant.ofEpochMilli(jsonparser.readValueAs(Long.class)).atZone(ZoneId.of("UTC")).toLocalDate();
  }
}
