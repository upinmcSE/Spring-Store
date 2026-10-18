package io.github.upinmcse.af0.common.exception.enums;

import io.github.upinmcse.af0.common.exception.ErrorCode;

public interface GlobalErrorCodeConstants {

    ErrorCode SUCCESS = new ErrorCode(0, "");

    ErrorCode BAD_REQUEST = new ErrorCode(400, "");
    ErrorCode UNAUTHORIZED = new ErrorCode(401, "");
    ErrorCode FORBIDDEN = new ErrorCode(403, "");
    ErrorCode NOT_FOUND = new ErrorCode(404, "");
    ErrorCode METHOD_NOT_ALLOWED = new ErrorCode(405, "");
    ErrorCode LOCKED = new ErrorCode(423, ""); // 并发请求，不允许
    ErrorCode TOO_MANY_REQUESTS = new ErrorCode(429, "");


    ErrorCode INTERNAL_SERVER_ERROR = new ErrorCode(500, "");
    ErrorCode NOT_IMPLEMENTED = new ErrorCode(501, "");
    ErrorCode ERROR_CONFIGURATION = new ErrorCode(502, "");

    ErrorCode REPEATED_REQUESTS = new ErrorCode(900, "");
    ErrorCode DEMO_DENY = new ErrorCode(901, "");

    ErrorCode UNKNOWN = new ErrorCode(999, "");
}
