package io.github.upinmcse.af0.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.github.upinmcse.af0.dao.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_beverage_profile")
public class BeverageProfile extends BaseEntity {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @Column(name = "is_cold", nullable = false)
    @Builder.Default
    private Boolean isCold = true;

    @Column(name = "is_hot", nullable = false)
    @Builder.Default
    private Boolean isHot = false;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BeverageProfile)) return false;
        return id != null && id.equals(((BeverageProfile) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
