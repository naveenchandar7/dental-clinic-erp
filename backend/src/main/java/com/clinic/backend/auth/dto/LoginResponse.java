package com.clinic.backend.auth.dto;

public record LoginResponse(String token, String username, String role) {
}
