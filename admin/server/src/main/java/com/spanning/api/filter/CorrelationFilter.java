/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.filter;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.spanning.api.corellation.Correlation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CorrelationFilter implements Filter {

  @Override
  public void doFilter(
    final ServletRequest request,
    final ServletResponse response,
    final FilterChain chain
  ) throws IOException, ServletException {
    final HttpServletRequest httpRequest = (HttpServletRequest) request;
    Optional.ofNullable(httpRequest.getHeader(Correlation.X_SPANNING_CORRELATION_ID_HEADER))
      .filter(StringUtils::isNotBlank)
      .map(Correlation::setCorrelationId)
      .orElseGet(Correlation::setRandomCorrelationId);
    chain.doFilter(request, response);
    Correlation.removeCorrelationId();
  }
}
