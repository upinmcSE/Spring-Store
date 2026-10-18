package io.github.upinmcse.af0.api.system.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateSysUserReq {

    @NotBlank
    @Size(max = 256)
    private String name;

    @NotBlank
    @Size(max = 256)
    private String password;

    @NotBlank
    @Size(max = 16)
    private String status;
}
