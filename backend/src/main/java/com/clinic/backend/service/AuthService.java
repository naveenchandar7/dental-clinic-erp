
package com.clinic.backend.service;

import com.clinic.backend.user.User;
import com.clinic.backend.user.Role;
import com.clinic.backend.user.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createFirstAdmin(
            String fullName,
            String username,
            String password,
            String confirmPassword) {

        if (userRepository.existsByRole(Role.ADMIN)) {
            throw new IllegalStateException(
                    "Admin account already exists");
        }

        if (fullName == null || fullName.isBlank()
                || username == null || username.isBlank()
                || password == null || password.length() < 8) {

            throw new IllegalArgumentException(
                    "Enter valid details. Password must be at least 8 characters");
        }

        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException(
                    "Passwords do not match");
        }

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException(
                    "Username already exists");
        }

        User user = new User();

        user.setFullName(fullName);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.ADMIN);
        user.setActive(true);

        return userRepository.save(user);
    }
}
