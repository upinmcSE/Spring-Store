package io.github.upinmcse.af0.manufacturing.entity.equipment;

import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.dao.model.Money;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
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
@Table(name = "tb_equipment")
public class Equipment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "purchase_invoice_line_id")
    private Long purchaseInvoiceLineId;

    @Column(name = "serial_number", unique = true, length = 100)
    private String serialNumber;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 100)
    private String model;

    @Column(name = "manufacturer", length = 150)
    private String manufacturer;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "amount", column = @Column(name = "purchase_price_amount", precision = 14, scale = 2)),
            @AttributeOverride(name = "currency", column = @Column(name = "purchase_price_currency", length = 3))
    })
    private Money purchasePrice;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "warranty_expiry_date")
    private LocalDate warrantyExpiryDate;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Equipment)) return false;
        return id != null && id.equals(((Equipment) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
