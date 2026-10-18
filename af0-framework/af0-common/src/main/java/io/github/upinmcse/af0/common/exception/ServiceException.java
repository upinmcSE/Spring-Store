package io.github.upinmcse.af0.common.exception;

import lombok.Getter;

/**
 * Business-rule failure. Extends RuntimeException so service code can throw it; the
 * message lives on Throwable rather than in a field of its own, which is why there is
 * no {@code @Data} here - a generated getMessage() would shadow the inherited one.
 */
@Getter
public class ServiceException extends RuntimeException {

    private final Integer code;

    public ServiceException(ErrorCode errorCode) {
        super(errorCode.getMsg());
        this.code = errorCode.getCode();
    }

    public ServiceException(Integer code, String message) {
        super(message);
        this.code = code;
    }
}
