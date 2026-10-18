package io.github.upinmcse.af0.manufacturing.entity.ingredient;

import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.dao.model.Money;
import io.github.upinmcse.af0.manufacturing.entity.ingredient.enumeration.IngredientUnit;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "tb_ingredient")
public class Ingredient extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "purchase_invoice_detail_id", unique = true)
    private Long purchaseInvoiceLineId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "ingredient_unit", nullable = false, length = 10)
    private IngredientUnit ingredientUnit; // ML, G, PCS

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "amount", column = @Column(name = "unit_cost_amount", precision = 12, scale = 4)),
            @AttributeOverride(name = "currency", column = @Column(name = "unit_cost_currency", length = 3))
    })
    private Money unitCost;

    @Column(name = "initial_quantity", nullable = false)
    private Long initialQuantity;

    @Column(name = "remaining_quantity", nullable = false)
    private Long remainingQuantity;

    @Column(name = "purchase_date", nullable = false)
    @Builder.Default
    private LocalDate purchaseDate = LocalDate.now();

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Ingredient)) return false;
        return id != null && id.equals(((Ingredient) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
