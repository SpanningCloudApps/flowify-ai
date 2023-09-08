package com.spanning.api.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

@Slf4j
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(
    final HttpServletRequest httpServletRequest,
    final HttpServletResponse httpServletResponse,
    final AuthenticationException exception
  ) throws IOException {
    httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getLocalizedMessage());
  }
}
