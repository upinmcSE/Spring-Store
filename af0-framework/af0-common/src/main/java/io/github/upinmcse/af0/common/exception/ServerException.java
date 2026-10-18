package io.github.upinmcse.af0.common.exception;

import lombok.Data;

@Data
public class ServerException {

    private Integer code;
    private String message;

    public ServerException() {
    }

    public ServerException(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMsg();
    }

    public ServerException(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
