package com.vaccination.backend.service;

import com.vaccination.backend.entity.Appointment;
import com.vaccination.backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment createAppointment(Appointment appointment) {
        appointment.setStatus("SCHEDULED");
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment updateAppointment(Appointment appointment) {

        Appointment existingAppointment = appointmentRepository
                .findById(appointment.getId())
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found"));

        if (appointment.getStatus() != null) {
            existingAppointment.setStatus(appointment.getStatus());
        }

        if (appointment.getAppointmentDate() != null) {
            existingAppointment.setAppointmentDate(
                    appointment.getAppointmentDate()
            );
        }

        if (appointment.getAppointmentTime() != null) {
            existingAppointment.setAppointmentTime(
                    appointment.getAppointmentTime()
            );
        }

        return appointmentRepository.save(existingAppointment);
    }
}