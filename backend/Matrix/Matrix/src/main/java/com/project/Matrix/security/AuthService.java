package com.project.Matrix.security;

import com.project.Matrix.DTO.LoginRequestDto;
import com.project.Matrix.DTO.LoginResponseDto;
import com.project.Matrix.DTO.SignupRequestDto;
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

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        String token = authUtil.generateAccessToken(user);

        return new LoginResponseDto(token, user.getId().toString());
    }

    public SignupResponseDto signup(SignupRequestDto signupRequestDto) {
        User existingUser = userRepository.findByName(signupRequestDto.getUsername()).orElse(null);

        if (existingUser != null) {
            throw new IllegalArgumentException("User already exists");
        }

        User user = User.builder()
                .name(signupRequestDto.getUsername())
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .email(signupRequestDto.getEmail())
                .shippingAddress(signupRequestDto.getShippingAddress())
                .paymentDetails(signupRequestDto.getPaymentDetails())
                .build();

        user = userRepository.save(user);

        return new SignupResponseDto(user.getId().toString(), user.getName());
    }


}


