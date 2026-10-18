package io.github.upinmcse.af0.product.entity;

import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.dao.model.Money;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_product-variants")
public class ProductVariant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, unique = true, length = 100)
    private String sku;

    @Column(name = "variant_name", nullable = false, length = 100)
    private String variantName;

    @Column(name = "net_value")
    private Integer netValue; // 250, 500, 350

    @Column(name = "net_unit", length = 20)
    private String netUnit; // gram, ml

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "amount",
                    column = @Column(
                            name = "price_amount",
                            nullable = false,
                            precision = 12,
                            scale = 2
                    )
            ),
            @AttributeOverride(
                    name = "currency",
                    column = @Column(
                            name = "price_currency",
                            nullable = false,
                            length = 3
                    )
            )
    })
    private Money price;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "amount",
                    column = @Column(
                            name = "original_price_amount",
                            precision = 12,
                            scale = 2
                    )
            ),
            @AttributeOverride(
                    name = "currency",
                    column = @Column(
                            name = "original_price_currency",
                            length = 3
                    )
            )
    })
    private Money originalPrice;

    @Column(name = "stock_quantity", nullable = false)
    @Builder.Default
    private Long stockQuantity = 0L;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "image_id")
    private Long imageId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductVariant)) return false;
        return id != null && id.equals(((ProductVariant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }
}
