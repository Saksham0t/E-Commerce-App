package com.project.Matrix.DTO;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrderDto {

    private String id;
    private String userId;
    private List<OrderProductDto> products;
    private int totalPrice;
    private LocalDate orderDate;
    private String shippingAddress;
    private String orderStatus;
    private String paymentStatus;
    private String paymentMethod;
}
