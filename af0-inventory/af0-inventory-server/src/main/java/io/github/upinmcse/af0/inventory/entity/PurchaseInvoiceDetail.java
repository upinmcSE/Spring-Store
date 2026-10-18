package io.github.upinmcse.af0.inventory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.dao.model.Money;
import io.github.upinmcse.af0.inventory.entity.enumeration.PurchaseItemType;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

import java.math.BigDecimal;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_purchase_invoice_detail")
public class PurchaseInvoiceDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_invoice_id", nullable = false)
    @JsonIgnore
    private PurchaseInvoice invoice;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type", nullable = false, length = 30)
    private PurchaseItemType itemType;

    @Column(name = "item_name", nullable = false, length = 200)
    private String itemName;

    @Column(name = "package_name", length = 100)
    private String packageName;

    @Column(name = "quantity_purchased", nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityPurchased;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "amount",
                    column = @Column(
                            name = "unit_price_amount",
                            nullable = false,
                            precision = 12,
                            scale = 2
                    )
            ),
            @AttributeOverride(
                    name = "currency",
                    column = @Column(
                            name = "unit_price_currency",
                            nullable = false,
                            length = 3
                    )
            )
    })
    private Money unitPrice;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "amount", column = @Column(name = "line_total_amount", nullable = false, precision = 14, scale = 2)),
            @AttributeOverride(name = "currency", column = @Column(name = "line_total_currency", nullable = false, length = 3))
    })
    private Money lineTotal;

    @Column(name = "target_product_variant_id")
    private Long targetProductVariantId;

    @Column(name = "target_bar_ingredient_id")
    private Long targetBarIngredientId;

    @Column(name = "total_units_converted", nullable = false)
    private Long totalUnitsConverted;

    @Column(length = 255)
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PurchaseInvoiceDetail)) return false;
        return id != null && id.equals(((PurchaseInvoiceDetail) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
