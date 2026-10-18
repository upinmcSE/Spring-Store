package io.github.upinmcse.af0.dao.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@EqualsAndHashCode
@ToString
public final class Sort {

    public static final Sort UNSORTED = new Sort(List.of());

    private final List<Order> orders;

    public Sort(List<Order> orders) {
        this.orders = List.copyOf(orders);
    }

    public static Sort by(Order... orders) {
        return new Sort(List.of(orders));
    }

    public boolean isUnsorted() {
        return orders.isEmpty();
    }

    public Sort and(Sort other) {
        List<Order> merged = new ArrayList<>(orders);
        merged.addAll(other.orders);
        return new Sort(merged);
    }
}
