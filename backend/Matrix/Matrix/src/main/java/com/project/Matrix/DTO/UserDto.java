package com.project.Matrix.DTO;

import lombok.Data;

@Data
public class UserDto {

    private String id;
    private String name;
    private String email;
    private String password;
    private String shippingAddress;
    private String paymentDetails;
}
