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

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(userService.mapUserEntityToUserDTO(user)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        User user = UserService.mapUserDtoToUserEntity(userDto);
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(userService.mapUserEntityToUserDTO(savedUser));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        User updatedUser = userService.updateUser(id, UserService.mapUserDtoToUserEntity(userDto));
        return updatedUser != null ? ResponseEntity.ok(userService.mapUserEntityToUserDTO(updatedUser)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
