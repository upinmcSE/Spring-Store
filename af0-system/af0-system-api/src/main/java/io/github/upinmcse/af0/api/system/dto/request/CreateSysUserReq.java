package io.github.upinmcse.af0.api.system.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateSysUserReq {

    @NotBlank
    @Size(max = 256)
    private String name;

    @NotBlank
    @Size(max = 256)
    private String username;

    @NotBlank
    @Size(max = 256)
    private String password;
}
