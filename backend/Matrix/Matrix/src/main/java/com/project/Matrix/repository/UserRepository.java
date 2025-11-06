package com.project.Matrix.repository;

import com.project.Matrix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}