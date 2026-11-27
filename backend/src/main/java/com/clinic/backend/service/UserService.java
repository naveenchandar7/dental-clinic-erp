
package com.clinic.backend.service;

import com.clinic.backend.user.User;
import com.clinic.backend.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }
}
