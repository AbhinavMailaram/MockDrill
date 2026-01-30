package com.clinic.appointment.scheduler;

import com.clinic.appointment.model.Appointment;
import com.clinic.appointment.model.Appointment.AppointmentStatus;
import com.clinic.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AppointmentCleanupScheduler {
    
    private final AppointmentRepository appointmentRepository;
    
    /**
     * Run every day at 2:00 AM to mark past scheduled appointments as NO_SHOW
     */
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void markPastAppointmentsAsNoShow() {
        log.info("Starting scheduled cleanup of past appointments");
        
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> pastAppointments = appointmentRepository.findPastScheduledAppointments(now);
        
        int count = 0;
        for (Appointment appointment : pastAppointments) {
            appointment.setStatus(AppointmentStatus.NO_SHOW);
            appointmentRepository.save(appointment);
            count++;
        }
        
        log.info("Marked {} past appointments as NO_SHOW", count);
    }
    
    /**
     * Run every 6 hours to clean up old cancelled appointments (older than 90 days)
     */
    @Scheduled(cron = "0 0 */6 * * ?")
    @Transactional
    public void cleanupOldCancelledAppointments() {
        log.info("Starting cleanup of old cancelled appointments");
        
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(90);
        List<Appointment> oldCancelled = appointmentRepository.findAll().stream()
            .filter(a -> a.getStatus() == AppointmentStatus.CANCELLED 
                && a.getUpdatedAt().isBefore(cutoffDate))
            .toList();
        
        int count = oldCancelled.size();
        appointmentRepository.deleteAll(oldCancelled);
        
        log.info("Deleted {} old cancelled appointments", count);
    }
}
