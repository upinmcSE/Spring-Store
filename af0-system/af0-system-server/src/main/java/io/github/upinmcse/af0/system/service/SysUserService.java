package io.github.upinmcse.af0.system.service;

import io.github.upinmcse.af0.api.system.dto.request.CreateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.request.UpdateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.response.SysUserRes;

import java.util.List;

public interface SysUserService {
    SysUserRes createSysUser(CreateSysUserReq request);
    SysUserRes updateSysUser(Long id, UpdateSysUserReq request);
    SysUserRes getSysUser(Long id);
    List<SysUserRes> getSysUsers();
}
