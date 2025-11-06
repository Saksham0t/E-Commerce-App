package com.Project.Matrix.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    @ManyToOne
    private User user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> products;

    private int totalPrice;
    private LocalDate orderDate;
    private String shippingAddress;
    private String orderStatus;
    private String paymentStatus;
    private String paymentMethod;
}
