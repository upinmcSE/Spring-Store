package io.github.upinmcse.af0.dao.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * Offset pagination request. {@code page} is <b>zero-based</b>, following Spring Data; a
 * one-based adapter is responsible for adding the offset itself.
 * <p>
 * {@code countTotal} is part of the contract rather than an adapter detail because both ORMs can
 * skip the count query (Spring Data via {@code PageableExecutionUtils}, MyBatis-Plus via
 * {@code Page.setSearchCount(false)}). Without it that optimisation would have to leak out.
 */
@Getter
@EqualsAndHashCode
@ToString
public final class PageRequest {

    private final int page;
    private final int size;
    private final Sort sort;
    private final boolean countTotal;

    private PageRequest(int page, int size, Sort sort, boolean countTotal) {
        if (page < 0) {
            throw new IllegalArgumentException("page must be >= 0 but was " + page);
        }
        if (size <= 0) {
            throw new IllegalArgumentException("size must be > 0 but was " + size);
        }
        this.page = page;
        this.size = size;
        this.sort = sort == null ? Sort.UNSORTED : sort;
        this.countTotal = countTotal;
    }

    public static PageRequest of(int page, int size) {
        return new PageRequest(page, size, Sort.UNSORTED, true);
    }

    public static PageRequest of(int page, int size, Sort sort) {
        return new PageRequest(page, size, sort, true);
    }

    public static PageRequest noCount(int page, int size, Sort sort) {
        return new PageRequest(page, size, sort, false);
    }

    public long offset() {
        return (long) page * size;
    }
}
