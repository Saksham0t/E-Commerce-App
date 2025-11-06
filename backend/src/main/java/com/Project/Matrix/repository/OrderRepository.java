package com.Project.Matrix.repository;

import com.Project.Matrix.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}