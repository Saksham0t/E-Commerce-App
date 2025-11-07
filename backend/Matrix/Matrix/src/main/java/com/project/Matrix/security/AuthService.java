package com.project.Matrix.security;

import com.project.Matrix.DTO.LoginRequestDto;
import com.project.Matrix.DTO.LoginResponseDto;
import com.project.Matrix.DTO.SignupResponseDto;
import com.project.Matrix.entity.User;
import com.project.Matrix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {

        User user2 = new User();
        user2.setName(loginRequestDto.getUsername());
        user2.setPassword(passwordEncoder.encode(loginRequestDto.getPassword()));
        user2.setShippingAddress("fewf");
        user2.setEmail("as@gmail.com");
        user2.setPaymentDetails("UPI");
        user2.setId("3");

        String token = authUtil.generateAccessToken(user2);

        return new LoginResponseDto(token, user2.getId());
    }

    public SignupResponseDto signup(LoginRequestDto signupRequestDto) {
        User user = userRepository.findByName(signupRequestDto.getUsername()).orElse(null);

        if(user != null) throw new IllegalArgumentException("User already exists");

        User user2 = new User();
        user2.setName(signupRequestDto.getUsername());
        user2.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));
        user2.setShippingAddress("fewf");
        user2.setEmail("as@gmail.com");
        user2.setPaymentDetails("UPI");
        user2.setId("3");
        user = userRepository.save(user2);

        return new SignupResponseDto(user.getId(), user.getName());
    }
}

