package io.github.upinmcse.af0.gateway.api.system;

import io.github.upinmcse.af0.api.system.SysUserApi;
import io.github.upinmcse.af0.api.system.dto.request.CreateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.request.UpdateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.response.SysUserRes;
import io.github.upinmcse.af0.common.pojo.CommonResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/system/users")
@RequiredArgsConstructor
public class SysUserController {

    private final SysUserApi sysUserApi;

    @PostMapping
    public CommonResult<SysUserRes> createSysUser(@Valid @RequestBody CreateSysUserReq request) {
        return CommonResult.success(sysUserApi.createSysUser(request));
    }

    @PutMapping("/{id}")
    public CommonResult<SysUserRes> updateSysUser(@PathVariable Long id,
                                                  @Valid @RequestBody UpdateSysUserReq request) {
        return CommonResult.success(sysUserApi.updateSysUser(id, request));
    }

    @GetMapping("/{id}")
    public CommonResult<SysUserRes> getSysUser(@PathVariable Long id) {
        return CommonResult.success(sysUserApi.getSysUser(id));
    }

    @GetMapping
    public CommonResult<List<SysUserRes>> getSysUsers() {
        return CommonResult.success(sysUserApi.getSysUsers());
    }
}
