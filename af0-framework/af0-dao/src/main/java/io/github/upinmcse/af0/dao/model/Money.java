package io.github.upinmcse.af0.dao.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Currency;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Money {

    @Column(precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(length = 3)
    private String currency; // ISO 4217: "VND", "USD", "EUR"

    public static Money of(BigDecimal amount, String currencyCode) {
        return new Money(amount, currencyCode.toUpperCase());
    }

    public static Money vnd(BigDecimal amount) {
        return new Money(amount, "VND");
    }

    public static Money usd(BigDecimal amount) {
        return new Money(amount, "USD");
    }

    public Currency getCurrencyInstance() {
        return currency != null ? Currency.getInstance(currency) : null;
    }
}
