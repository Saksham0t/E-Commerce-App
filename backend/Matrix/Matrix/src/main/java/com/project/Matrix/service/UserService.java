package com.project.Matrix.service;

import com.project.Matrix.DTO.UserDto;
import com.project.Matrix.entity.User;
import com.project.Matrix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapUserEntityToUserDTO)
                .collect(Collectors.toList());
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    public User createUser(User user) {
        if (userRepository.existsById(user.getId().toString())) {
            throw new RuntimeException("User with ID already exists: " + user.getId());
        }
        return userRepository.save(user);
    }

    public User updateUser(String id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        modelMapper.map(updatedUser, existingUser);
        return userRepository.save(existingUser);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    public UserDto mapUserEntityToUserDTO(User user) {
        return user == null ? null : modelMapper.map(user, UserDto.class);
    }

    public static User mapUserDtoToUserEntity(UserDto dto) {
        if (dto == null) return null;
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, User.class);
    }
}
