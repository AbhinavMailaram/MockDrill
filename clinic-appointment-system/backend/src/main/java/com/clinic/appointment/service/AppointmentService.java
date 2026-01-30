package com.clinic.appointment.service;

import com.clinic.appointment.dto.AppointmentDTO;
import com.clinic.appointment.model.Appointment;
import com.clinic.appointment.model.Appointment.AppointmentStatus;
import com.clinic.appointment.model.User;
import com.clinic.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final UserService userService;
    
    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        // Validate appointment date is in the future
        if (appointmentDTO.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Appointment date must be in the future");
        }
        
        // Check for conflicts
        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
            appointmentDTO.getDoctorName(),
            appointmentDTO.getAppointmentDate()
        );
        
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("This time slot is already booked for the selected doctor");
        }
        
        User user = userService.getUserEntityById(appointmentDTO.getUserId());
        
        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setPatientName(appointmentDTO.getPatientName());
        appointment.setPatientPhone(appointmentDTO.getPatientPhone());
        appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        appointment.setDoctorName(appointmentDTO.getDoctorName());
        appointment.setDepartment(appointmentDTO.getDepartment());
        appointment.setReason(appointmentDTO.getReason());
        appointment.setStatus(AppointmentStatus.SCHEDULED);
        appointment.setNotes(appointmentDTO.getNotes());
        
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }
    
    public Optional<AppointmentDTO> getAppointmentById(Long id) {
        return appointmentRepository.findById(id).map(this::convertToDTO);
    }
    
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByUser(Long userId) {
        User user = userService.getUserEntityById(userId);
        return appointmentRepository.findByUserOrderByAppointmentDateDesc(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        if (appointmentDTO.getPatientName() != null) {
            appointment.setPatientName(appointmentDTO.getPatientName());
        }
        if (appointmentDTO.getPatientPhone() != null) {
            appointment.setPatientPhone(appointmentDTO.getPatientPhone());
        }
        if (appointmentDTO.getAppointmentDate() != null) {
            if (appointmentDTO.getAppointmentDate().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Appointment date must be in the future");
            }
            appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        }
        if (appointmentDTO.getDoctorName() != null) {
            appointment.setDoctorName(appointmentDTO.getDoctorName());
        }
        if (appointmentDTO.getDepartment() != null) {
            appointment.setDepartment(appointmentDTO.getDepartment());
        }
        if (appointmentDTO.getReason() != null) {
            appointment.setReason(appointmentDTO.getReason());
        }
        if (appointmentDTO.getStatus() != null) {
            appointment.setStatus(appointmentDTO.getStatus());
        }
        if (appointmentDTO.getNotes() != null) {
            appointment.setNotes(appointmentDTO.getNotes());
        }
        
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(updatedAppointment);
    }
    
    @Transactional
    public void cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }
    
    @Transactional
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }
    
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setUserId(appointment.getUser().getId());
        dto.setPatientName(appointment.getPatientName());
        dto.setPatientPhone(appointment.getPatientPhone());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setDoctorName(appointment.getDoctorName());
        dto.setDepartment(appointment.getDepartment());
        dto.setReason(appointment.getReason());
        dto.setStatus(appointment.getStatus());
        dto.setNotes(appointment.getNotes());
        dto.setCreatedAt(appointment.getCreatedAt());
        dto.setUpdatedAt(appointment.getUpdatedAt());
        return dto;
    }
}
