package io.github.upinmcse.af0.product.entity.enumeration;

import lombok.Getter;

@Getter
public enum ProcessRoastMethod {

    NATURAL("");

    private final String displayName;

    ProcessRoastMethod(String displayName) {
        this.displayName = displayName;
    }
}
