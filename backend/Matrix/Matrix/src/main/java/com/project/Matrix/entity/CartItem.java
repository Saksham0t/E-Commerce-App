package com.project.Matrix.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@Table(name = "cart_item")
public class CartItem {

    @Id
    private String id;

    private String productid;
    private int quantity;
    private int totalPrice;
}
