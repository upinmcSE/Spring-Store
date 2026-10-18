package io.github.upinmcse.af0.dao.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

@Getter
@EqualsAndHashCode
@ToString
public final class PageResult<T> {

    private final List<T> content;
    private final int page;
    private final int size;
    private final long totalElements;

    public PageResult(List<T> content, int page, int size, long totalElements) {
        this.content = List.copyOf(content);
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
    }

    public int totalPages() {
        if (size == 0 || totalElements < 0) {
            return 0;
        }
        return (int) ((totalElements + size - 1) / size);
    }

    public boolean hasNext() {
        if (totalElements < 0) {
            return content.size() == size;
        }
        return (long) (page + 1) * size < totalElements;
    }

    public boolean isEmpty() {
        return content.isEmpty();
    }

    public <R> PageResult<R> map(Function<? super T, ? extends R> mapper) {
        List<R> mapped = new ArrayList<>(content.size());
        for (T item : content) {
            mapped.add(mapper.apply(item));
        }
        return new PageResult<>(mapped, page, size, totalElements);
    }

    public static <T> PageResult<T> empty(PageRequest request) {
        return new PageResult<>(List.of(), request.getPage(), request.getSize(), 0L);
    }
}
