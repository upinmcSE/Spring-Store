package io.github.upinmcse.af0.manufacturing.entity.roastery;

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

import java.time.LocalDate;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_green_bean_stock")
public class GreenBeanStock extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "purchase_invoice_detail_id", unique = true)
    private Long purchaseInvoiceDetailId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(nullable = false, length = 150)
    private String name;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "amount",
                    column = @Column(
                            name = "cost_per_kg_amount",
                            nullable = false,
                            precision = 12,
                            scale = 2
                    )
            ),
            @AttributeOverride(
                    name = "currency",
                    column = @Column(
                            name = "cost_per_kg_currency",
                            nullable = false,
                            length = 3
                    )
            )
    })
    private Money costPerKg;

    @Column(name = "initial_weight_grams", nullable = false, precision = 10, scale = 2)
    private Long initialWeightGrams;

    @Column(name = "remaining_weight_grams", nullable = false, precision = 10, scale = 2)
    private Long remainingWeightGrams;

    @Column(name = "purchase_date", nullable = false)
    @Builder.Default
    private LocalDate purchaseDate = LocalDate.now();

    @Column(columnDefinition = "TEXT")
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GreenBeanStock)) return false;
        return id != null && id.equals(((GreenBeanStock) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
