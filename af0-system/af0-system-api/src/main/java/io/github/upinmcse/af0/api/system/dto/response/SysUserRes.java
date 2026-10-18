package io.github.upinmcse.af0.api.system.dto.response;

import lombok.Data;

import java.time.Instant;

@Data
public class SysUserRes {

    private Long id;
    private String username;
    private String name;
    private String status;

    private String createdBy;
    private Instant createdAt;
    private String lastModifiedBy;
    private Instant lastModifiedAt;
}
