
package com.clinic.backend.doctor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor")
public class DoctorTestController {

    @GetMapping("/test")
    public String doctorTest() {
        return "Doctor authorization successful!";
    }
}
