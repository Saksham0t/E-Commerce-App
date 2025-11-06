package com.Project.Matrix.repository;

import com.Project.Matrix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}