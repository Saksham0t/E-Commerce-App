package com.project.Matrix.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@Table(name = "order_product")
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productid;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
