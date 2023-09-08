/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.filter;

import com.spanning.api.corellation.Correlation;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomHeaderClientFilter implements RequestInterceptor {

  @Override
  public void apply(final RequestTemplate template) {
    if (!template.headers().containsKey(Correlation.X_SPANNING_CORRELATION_ID_HEADER)) {
      template.header(Correlation.X_SPANNING_CORRELATION_ID_HEADER, Correlation.getCorrelationId());
    }
  }
}
