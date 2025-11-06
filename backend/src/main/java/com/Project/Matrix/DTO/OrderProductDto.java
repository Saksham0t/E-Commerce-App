package com.Project.Matrix.DTO;

import com.Project.Matrix.entity.Order;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class OrderProductDto {


    private String productid;
    private int quantity;
}
