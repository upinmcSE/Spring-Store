package io.github.upinmcse.af0.dao.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public final class Order {

    private final String field;
    private final Direction direction;

    public static Order asc(String field) {
        return new Order(field, Direction.ASC);
    }

    public static Order desc(String field) {
        return new Order(field, Direction.DESC);
    }

}
