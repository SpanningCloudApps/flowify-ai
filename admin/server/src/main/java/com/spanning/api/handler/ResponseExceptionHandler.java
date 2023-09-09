package com.spanning.api.handler;

import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

import com.spanning.api.dto.response.ApiErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.Errors;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({Exception.class})
  public ResponseEntity<Object> handleAllExceptions(
    final Exception exception,
    final WebRequest request
  ) {
    log.error("[EXCEPTION HANDLER ADMIN SERVER] An internal error occurred: ", exception);

    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(exception, HttpStatus.INTERNAL_SERVER_ERROR),
      new HttpHeaders(),
      HttpStatus.INTERNAL_SERVER_ERROR,
      request
    );
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<Object> handleMethodArgumentTypeMismatch(
    final MethodArgumentTypeMismatchException exception,
    final WebRequest request
  ) {
    final String message = String.format(
      "The parameter '%s' of value '%s' could not be converted to type '%s'",
      exception.getName(),
      exception.getValue(),
      Optional.ofNullable(exception.getRequiredType())
        .map(Class::getSimpleName)
        .orElse("Not detected.")
    );

    log.warn("[EXCEPTION HANDLER ADMIN SERVER] {}: ", message, exception);

    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(message, HttpStatus.BAD_REQUEST),
      new HttpHeaders(),
      HttpStatus.BAD_REQUEST,
      request
    );
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Object> handleAccessDeniedException(
    final AccessDeniedException exception,
    final WebRequest request
  ) {
    final String message = "You have no permissions to access this resource";

    log.warn("[EXCEPTION HANDLER ADMIN SERVER] {}: ", message, exception);

    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(message, HttpStatus.FORBIDDEN),
      new HttpHeaders(),
      HttpStatus.FORBIDDEN,
      request
    );
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgumentException(
    final IllegalArgumentException exception,
    final WebRequest request
  ) {
    log.warn("[EXCEPTION HANDLER ADMIN SERVER] Illegal argument: ", exception);

    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(exception, HttpStatus.BAD_REQUEST),
      new HttpHeaders(),
      HttpStatus.BAD_REQUEST,
      request
    );
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Object> handleConstraintViolationException(
    final ConstraintViolationException exception,
    final WebRequest request
  ) {
    log.warn("[EXCEPTION HANDLER ADMIN SERVER] Invalid argument : ", exception);
    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(exception, HttpStatus.BAD_REQUEST),
      new HttpHeaders(),
      HttpStatus.BAD_REQUEST,
      request
    );
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
    final MethodArgumentNotValidException exception,
    final HttpHeaders headers,
    final HttpStatus status,
    final WebRequest request
  ) {
    final String fieldErrors = Optional.of(exception)
      .map(MethodArgumentNotValidException::getBindingResult)
      .map(Errors::getFieldErrors)
      .get().stream()
      .map(error -> error.getField() + ": " + error.getDefaultMessage())
      .collect(Collectors.joining(System.lineSeparator()));

    final String objectErrors = Optional.of(exception)
      .map(MethodArgumentNotValidException::getBindingResult)
      .map(Errors::getGlobalErrors).get().stream()
      .map(error -> error.getObjectName() + ": " + error.getDefaultMessage())
      .collect(Collectors.joining(System.lineSeparator()));

    final String message =
      String.format("One or several arguments are not valid: %n%s %n%s", objectErrors, fieldErrors);

    log.error("[EXCEPTION HANDLER ADMIN SERVER] Argument not valid error occurred:  {}", message);

    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(fieldErrors, status),
      new HttpHeaders(),
      status,
      request
    );
  }

  @Override
  protected ResponseEntity<Object> handleBindException(
    final BindException exception,
    final HttpHeaders headers,
    final HttpStatus status,
    final WebRequest request
  ) {

    final String fieldErrors = Optional.of(exception)
      .map(BindException::getBindingResult)
      .map(Errors::getFieldErrors)
      .get().stream()
      .map(error -> error.getField() + ": " + error.getDefaultMessage())
      .collect(Collectors.joining(System.lineSeparator()));

    final String objectErrors = Optional.of(exception)
      .map(BindException::getBindingResult)
      .map(Errors::getGlobalErrors).get().stream()
      .map(error -> error.getObjectName() + ": " + error.getDefaultMessage())
      .collect(Collectors.joining(System.lineSeparator()));

    final String message =
      String.format("One or several arguments are not valid: %n%s %n%s", objectErrors, fieldErrors);

    log.error("[EXCEPTION HANDLER API GATEWAY] Argument not valid error occurred:  {}", message);

    return handleExceptionInternal(
      exception,
      new ApiErrorResponseDto(fieldErrors, status),
      new HttpHeaders(),
      status,
      request
    );
  }

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(
    final Exception exception,
    @Nullable final Object body,
    final HttpHeaders headers,
    final HttpStatus status,
    final WebRequest request
  ) {

    final Object responseBody = Optional.ofNullable(body)
      .orElseGet(() -> new ApiErrorResponseDto(exception, status));

    return super.handleExceptionInternal(exception, responseBody, headers, status, request);
  }
}
