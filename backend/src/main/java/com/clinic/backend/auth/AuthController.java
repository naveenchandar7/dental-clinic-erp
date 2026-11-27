
package com.clinic.backend.auth;

import com.clinic.backend.service.AuthService;
import com.clinic.backend.user.User;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/setup")
    public ResponseEntity<?> setupAdmin(
            @RequestBody Map<String, String> request) {

        try {
            User admin = authService.createFirstAdmin(
                    request.get("fullName"),
                    request.get("username"),
                    request.get("password"),
                    request.get("confirmPassword")
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Admin created successfully",
                    "username", admin.getUsername()
            ));

        } catch (IllegalArgumentException |
                 IllegalStateException ex) {

            return ResponseEntity.badRequest()
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentUser(
            Authentication authentication) {

        return ResponseEntity.ok(Map.of(
                "username", authentication.getName(),
                "role", authentication.getAuthorities()
                        .iterator().next().getAuthority()
        ));
    }
}
