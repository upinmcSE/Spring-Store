package io.github.upinmcse.af0.system.entity;

import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.system.entity.enums.UserStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tb_sys_user")
@Getter
@Setter
@ToString(callSuper = true, exclude = "password")
public class SysUser extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", nullable = false, length = 256, unique = true)
    private String username;

    @Column(name = "password", length = 256)
    private String password;

    @Column(name = "name", length = 256)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 16)
    private UserStatus status;

    @Version
    @Column(name = "version", nullable = false)
    private Long version;
}
