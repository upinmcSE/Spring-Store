package io.github.upinmcse.af0.system.exception;

import io.github.upinmcse.af0.common.exception.ErrorCode;

public interface SysUserErrorCodeConstants {

    ErrorCode USER_NOT_FOUND = new ErrorCode(1_002_000_001, "Người dùng không tồn tại");
    ErrorCode USERNAME_ALREADY_EXISTS = new ErrorCode(1_002_000_002, "Tên đăng nhập đã tồn tại");
}
