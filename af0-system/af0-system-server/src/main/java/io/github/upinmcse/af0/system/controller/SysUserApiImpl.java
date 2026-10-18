package io.github.upinmcse.af0.system.controller;

import io.github.upinmcse.af0.api.system.SysUserApi;
import io.github.upinmcse.af0.api.system.dto.request.CreateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.request.UpdateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.response.SysUserRes;
import io.github.upinmcse.af0.system.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SysUserApiImpl implements SysUserApi {

    private final SysUserService sysUserService;

    @Override
    public SysUserRes createSysUser(CreateSysUserReq request) {
        return sysUserService.createSysUser(request);
    }

    @Override
    public SysUserRes updateSysUser(Long id, UpdateSysUserReq request) {
        return sysUserService.updateSysUser(id, request);
    }

    @Override
    public SysUserRes getSysUser(Long id) {
        return sysUserService.getSysUser(id);
    }

    @Override
    public List<SysUserRes> getSysUsers() {
        return sysUserService.getSysUsers();
    }
}
