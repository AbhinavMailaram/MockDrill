package com.clinic.appointment.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments", indexes = {
    @Index(name = "idx_user_id", columnList = "user_id"),
    @Index(name = "idx_appointment_date", columnList = "appointmentDate"),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User is required")
    private User user;
    
    @NotBlank(message = "Patient name is required")
    @Column(nullable = false, length = 100)
    private String patientName;
    
    @Column(length = 15)
    private String patientPhone;
    
    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    @Column(nullable = false)
    private LocalDateTime appointmentDate;
    
    @NotBlank(message = "Doctor name is required")
    @Column(nullable = false, length = 100)
    private String doctorName;
    
    @Column(length = 50)
    private String department;
    
    @Column(length = 500)
    private String reason;
    
    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    
    @Column(length = 255)
    private String notes;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum AppointmentStatus {
        SCHEDULED,
        CONFIRMED,
        COMPLETED,
        CANCELLED,
        NO_SHOW
    }
}
