package io.github.upinmcse.af0.system.service;

import io.github.upinmcse.af0.api.system.dto.request.CreateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.request.UpdateSysUserReq;
import io.github.upinmcse.af0.api.system.dto.response.SysUserRes;
import io.github.upinmcse.af0.common.exception.ServiceException;
import io.github.upinmcse.af0.system.entity.SysUser;
import io.github.upinmcse.af0.system.entity.enums.UserStatus;
import io.github.upinmcse.af0.system.exception.SysUserErrorCodeConstants;
import io.github.upinmcse.af0.system.repository.SysUserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SysUserServiceImpl implements SysUserService {

    private final SysUserRepository sysUserRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public SysUserRes createSysUser(CreateSysUserReq request) {
        if (sysUserRepository.existsByUsername(request.getUsername())) {
            throw new ServiceException(SysUserErrorCodeConstants.USERNAME_ALREADY_EXISTS);
        }

        SysUser user = modelMapper.map(request, SysUser.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (user.getStatus() == null) {
            user.setStatus(UserStatus.ACTIVE);
        }

        SysUser saved = sysUserRepository.saveAndFlush(user);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public SysUserRes updateSysUser(Long id, UpdateSysUserReq request) {
        SysUser user = findOrThrow(id);
        modelMapper.map(request, user);
        return toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public SysUserRes getSysUser(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SysUserRes> getSysUsers() {
        return sysUserRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private SysUser findOrThrow(Long id) {
        return sysUserRepository.findById(id)
                .orElseThrow(() -> new ServiceException(SysUserErrorCodeConstants.USER_NOT_FOUND));
    }

    private SysUserRes toResponse(SysUser user) {
        return modelMapper.map(user, SysUserRes.class);
    }
}