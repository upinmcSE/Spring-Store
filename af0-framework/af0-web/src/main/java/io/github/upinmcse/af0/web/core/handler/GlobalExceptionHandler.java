package io.github.upinmcse.af0.web.core.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {
//    @ExceptionHandler(RequestNotPermitted.class)
//    ResponseEntity<ErrorResponse> handleRateLimit(RequestNotPermitted ex) {
//        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
//                .header(HttpHeaders.RETRY_AFTER, "1")
//                .body(new ErrorResponse(429, resolve("common.too-many-requests"), List.of()));
//    }
//
//    @ExceptionHandler({CallNotPermittedException.class, BulkheadFullException.class})
//    ResponseEntity<ErrorResponse> handleUnavailable(RuntimeException ex) {
//        log.warn("Upstream unavailable: {}", ex.getMessage());
//        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                .body(new ErrorResponse(503, resolve("common.service-unavailable"), List.of()));
//    }
}
