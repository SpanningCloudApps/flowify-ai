package com.spanning.api.corellation;

import java.util.Optional;
import java.util.Random;
import java.util.stream.IntStream;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;

public class Correlation {

  public static final String CORRELATION_ID_KEY = "correlationId";
  public static final String UNKNOWN_VALUE = "????????";
  public static final String X_CORRELATION_ID_HEADER = "x-correlationid";

  private static final String SEED_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private static final Random RANDOM = new Random();
  private static final int CORRELATION_ID_LENGTH = 8;

  private Correlation() {}

  public static String getCorrelationId() {
    return Optional.ofNullable(MDC.get(CORRELATION_ID_KEY))
      .filter(StringUtils::isNotBlank)
      .orElse(UNKNOWN_VALUE);
  }

  public static String setRandomCorrelationId() {
    return setCorrelationId(generateId());
  }

  public static String setCorrelationId(final String id) {
    MDC.put(CORRELATION_ID_KEY, id);
    return id;
  }

  public static void removeCorrelationId() {
    MDC.remove(CORRELATION_ID_KEY);
  }

  // Reference
  // https://stackoverflow.com/questions/41107/how-to-generate-a-random-alpha-numeric-string/157202#157202
  private static String generateId() {
    final StringBuilder sb = new StringBuilder(CORRELATION_ID_LENGTH);
    final int seedLength = SEED_STRING.length();
    IntStream.range(0, CORRELATION_ID_LENGTH)
      .forEach(i -> {
        final int randomInt = RANDOM.nextInt(seedLength);
        sb.append(SEED_STRING.charAt(randomInt));
      });
    return sb.toString();
  }
}
