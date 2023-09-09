package com.spanning.api.security.util;

import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.SerializationUtils;

public final class CookieUtils {

  private CookieUtils() {
  }

  public static Optional<Cookie> getCookie(
    final HttpServletRequest request,
    final String name
  ) {
    return Optional.of(request)
      .map(HttpServletRequest::getCookies)
      .map(Arrays::asList)
      .filter(CollectionUtils::isNotEmpty)
      .stream()
      .flatMap(List::stream)
      .filter(cookie -> name.equals(cookie.getName()))
      .findFirst();
  }

  public static void addCookie(
    final HttpServletResponse response,
    final String name,
    final String value,
    final int maxAge
  ) {
    final Cookie cookie = new Cookie(name, value);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(maxAge);
    response.addCookie(cookie);
  }

  public static void deleteCookie(
    final HttpServletResponse response,
    final String name
  ) {
    addCookie(response, name, StringUtils.EMPTY, 0);
  }

  public static String serialize(final Object object) {
    return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(object));
  }

  public static <T> T deserialize(
    final Cookie cookie,
    final Class<T> cls
  ) {
    return cls.cast(SerializationUtils.deserialize(Base64.getUrlDecoder().decode(cookie.getValue())));
  }
}
