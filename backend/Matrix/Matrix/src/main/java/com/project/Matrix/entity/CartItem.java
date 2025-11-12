package com.project.Matrix.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productid;
    private int quantity;
    private int totalPrice;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
}
