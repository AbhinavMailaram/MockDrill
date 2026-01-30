package com.clinic.appointment.repository;

import com.clinic.appointment.model.Appointment;
import com.clinic.appointment.model.Appointment.AppointmentStatus;
import com.clinic.appointment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByUser(User user);
    
    List<Appointment> findByUserOrderByAppointmentDateDesc(User user);
    
    List<Appointment> findByStatus(AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN :start AND :end AND a.status = :status")
    List<Appointment> findByAppointmentDateBetweenAndStatus(
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end,
        @Param("status") AppointmentStatus status
    );
    
    @Query("SELECT a FROM Appointment a WHERE a.doctorName = :doctorName AND a.appointmentDate = :appointmentDate AND a.status IN ('SCHEDULED', 'CONFIRMED')")
    List<Appointment> findConflictingAppointments(
        @Param("doctorName") String doctorName,
        @Param("appointmentDate") LocalDateTime appointmentDate
    );
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate < :date AND a.status IN ('SCHEDULED', 'CONFIRMED')")
    List<Appointment> findPastScheduledAppointments(@Param("date") LocalDateTime date);
}
