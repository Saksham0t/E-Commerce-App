package com.project.Matrix.service;

import com.project.Matrix.DTO.UserDto;
import com.project.Matrix.entity.User;
import com.project.Matrix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // GET: Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET: Fetch user by ID
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    // POST: Create a new user
    public User createUser(User user) {
        if (userRepository.existsById(user.getId())) {
            throw new RuntimeException("User with ID already exists: " + user.getId());
        }
        return userRepository.save(user);
    }

    // PUT: Update an existing user
    public User updateUser(String id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        modelMapper.map(updatedUser, existingUser);
        return userRepository.save(existingUser);
    }

    // DELETE: Remove a user by ID
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    // Convert entity to DTO
    public UserDto toDTO(User user) {
        return user == null ? null : modelMapper.map(user, UserDto.class);
    }

    // Convert DTO to entity
    public static User toEntity(UserDto dto) {
        if (dto == null) return null;
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, User.class);
    }
}
