package io.github.upinmcse.af0.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.product.entity.enumeration.ProcessRoastMethod;
import io.github.upinmcse.af0.product.entity.enumeration.RoastLevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_coffee_bean_profile")
public class CoffeeBeanProfile extends BaseEntity {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @Column(length = 150)
    private String origin;

    @Column(length = 50)
    private String species;

    @Enumerated(EnumType.STRING)
    @Column(name = "process_method", length = 100)
    private ProcessRoastMethod processMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "roast_level", length = 50)
    private RoastLevel roastLevel;

    @Column(name = "roast_date")
    private LocalDate roastDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CoffeeBeanProfile)) return false;
        return id != null && id.equals(((CoffeeBeanProfile) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
