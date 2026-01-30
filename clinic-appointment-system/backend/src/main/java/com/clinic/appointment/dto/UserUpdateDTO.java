package com.clinic.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    
    private String fullName;
    private String phoneNumber;
    private String address;
    private String email;
    private String currentPassword;
    private String newPassword;
}
