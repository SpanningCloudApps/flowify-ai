package com.spanning.config.security;

import com.spanning.api.security.RestAuthenticationEntryPoint;
import com.spanning.api.security.handler.OAuth2AuthenticationSuccessHandler;
import com.spanning.api.security.jwt.JwtTokenFilter;
import com.spanning.api.security.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.spanning.api.security.resolver.DefaultAuthorizationRequestResolver;
import com.spanning.api.security.service.DefaultOauth2UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.authentication.logout.CompositeLogoutHandler;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private static final String TOKEN_NAME = "JWT";

  private final String proxyUrl;
  private final String cookieDomain;

  private final DefaultOauth2UserService oauth2UserService;
  private final JwtTokenFilter jwtTokenFilter;
  private final HttpCookieOAuth2AuthorizationRequestRepository repository;
  private final OAuth2AuthenticationSuccessHandler successHandler;
  private final ClientRegistrationRepository clientRegistrationRepository;

  @Autowired
  public SecurityConfig(
    @Value("${proxy.admin-ui.url}") final String proxyUrl,
    @Value("${security.csrf.cookie.domain}") final String cookieDomain,
    final DefaultOauth2UserService oauth2UserService,
    final JwtTokenFilter jwtTokenFilter,
    final HttpCookieOAuth2AuthorizationRequestRepository repository,
    final OAuth2AuthenticationSuccessHandler successHandler,
    final ClientRegistrationRepository clientRegistrationRepository
  ) {
    this.proxyUrl = proxyUrl;
    this.cookieDomain = cookieDomain;
    this.oauth2UserService = oauth2UserService;
    this.jwtTokenFilter = jwtTokenFilter;
    this.repository = repository;
    this.successHandler = successHandler;
    this.clientRegistrationRepository = clientRegistrationRepository;
  }

  @Override
  protected void configure(final HttpSecurity http) throws Exception {
    http
      .cors()
      .and()
      .csrf().disable()
      .formLogin().disable()
      .httpBasic().disable()
      .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
      .and()
      .authorizeRequests()
      .anyRequest().authenticated()
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .logout()
      .permitAll()
      .addLogoutHandler(
        new CompositeLogoutHandler(new CookieClearingLogoutHandler(TOKEN_NAME), new SecurityContextLogoutHandler()))
      .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler()).permitAll()
      .and()
      .oauth2Login().failureUrl(proxyUrl + "/login")
      .authorizationEndpoint().authorizationRequestRepository(repository)
      .authorizationRequestResolver(new DefaultAuthorizationRequestResolver(clientRegistrationRepository))
      .and()
      .successHandler(successHandler)
      .userInfoEndpoint().oidcUserService(oauth2UserService);

    http.addFilterBefore(jwtTokenFilter, OAuth2LoginAuthenticationFilter.class);
  }

  @Bean
  GrantedAuthorityDefaults grantedAuthorityDefaults() {
    return new GrantedAuthorityDefaults(StringUtils.EMPTY);
  }
}
