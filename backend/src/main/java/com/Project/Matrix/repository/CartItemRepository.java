package com.Project.Matrix.repository;

import com.Project.Matrix.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, String> {

    Optional<CartItem> findByProductid(String productid);
}
