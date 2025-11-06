package com.Project.Matrix.repository;

import com.Project.Matrix.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
}