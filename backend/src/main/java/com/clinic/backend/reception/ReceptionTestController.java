package com.clinic.backend.reception;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reception")
public class ReceptionTestController {

    @GetMapping("/test")
    public String receptionTest() {
        return "Receptionist authorization successful!";
    }
}