package io.github.upinmcse.af0.product.entity.enumeration;

import lombok.Getter;

@Getter
public enum RoastLevel {
    LIGHT(""),
    MEDIUM_LIGHT(""),
    MEDIUM(""),
    MEDIUM_DARK(""),
    DARK("");

    private final String displayName;

    RoastLevel(String displayName) {
        this.displayName = displayName;
    }
}
