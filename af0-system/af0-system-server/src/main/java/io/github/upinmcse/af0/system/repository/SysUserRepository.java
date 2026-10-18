package io.github.upinmcse.af0.system.repository;

import io.github.upinmcse.af0.dao.BaseDao;
import io.github.upinmcse.af0.system.entity.SysUser;
import org.springframework.stereotype.Repository;

@Repository
public interface SysUserRepository extends BaseDao<SysUser, Long> {

    boolean existsByUsername(String username);
}
