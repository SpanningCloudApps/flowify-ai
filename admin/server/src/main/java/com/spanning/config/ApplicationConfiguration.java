package com.spanning.config;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
@ConfigurationPropertiesScan(basePackages = "com.spanning")
public class ApplicationConfiguration {

  @PostConstruct
  public void init() {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  }
}
