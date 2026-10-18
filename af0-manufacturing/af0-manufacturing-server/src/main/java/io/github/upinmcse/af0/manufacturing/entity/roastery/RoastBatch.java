package io.github.upinmcse.af0.manufacturing.entity.roastery;

import io.github.upinmcse.af0.dao.BaseEntity;
import io.github.upinmcse.af0.manufacturing.entity.roastery.enumeration.RoastLevel;
import jakarta.persistence.Column;
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
import java.time.LocalDate;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_roast_batch")
public class RoastBatch extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "batch_code", nullable = false, unique = true, length = 50)
    private String batchCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "green_bean_id", nullable = false)
    private GreenBeanStock greenBean;

    @Column(name = "roast_date", nullable = false)
    @Builder.Default
    private LocalDate roastDate = LocalDate.now();

    @Column(name = "roaster_name", length = 100)
    private String roasterName;

    @Enumerated(EnumType.STRING)
    @Column(name = "roast_level", nullable = false, length = 50)
    private RoastLevel roastLevel;

    @Column(name = "input_weight_grams", nullable = false, precision = 10, scale = 2)
    private Long inputWeightGrams;

    @Column(name = "output_standard_weight_grams", nullable = false, precision = 10, scale = 2)
    private Long outputStandardWeightGrams;

    @Column(name = "broken_weight_grams", precision = 10, scale = 2)
    @Builder.Default
    private Long brokenWeightGrams = 0L;

    @Column(name = "loss_percentage", insertable = false, updatable = false, precision = 5, scale = 2)
    private BigDecimal lossPercentage;

    @Column(name = "target_variant_id")
    private Long targetVariantId;

    // Số lượng gói đã đóng được từ mẻ này
    @Column(name = "number_packages_produced")
    private Integer numberPackagesProduced;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoastBatch)) return false;
        return id != null && id.equals(((RoastBatch) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
