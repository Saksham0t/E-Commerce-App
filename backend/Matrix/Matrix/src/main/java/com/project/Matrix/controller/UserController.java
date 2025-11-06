package com.project.Matrix.controller;

import com.project.Matrix.DTO.UserDto;
import com.project.Matrix.entity.User;
import com.project.Matrix.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET /users → fetch all users
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers()
                .stream()
                .map(userService::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    // GET /users/{id} → fetch user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(userService.toDTO(user)) : ResponseEntity.notFound().build();
    }

    // POST /users → create a new user
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        User user = UserService.toEntity(userDto);
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(userService.toDTO(savedUser));
    }

    // PUT /users/{id} → update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        User updatedUser = userService.updateUser(id, UserService.toEntity(userDto));
        return updatedUser != null ? ResponseEntity.ok(userService.toDTO(updatedUser)) : ResponseEntity.notFound().build();
    }

    // DELETE /users/{id} → delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
