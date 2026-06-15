package hospital_management.controller;

import hospital_management.entity.Appointment;
import hospital_management.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Get All Appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Save Appointment
    @PostMapping
    public Appointment saveAppointment(
            @RequestBody Appointment appointment) {

        return appointmentService.saveAppointment(appointment);
    }

    // Delete Appointment
    @DeleteMapping("/{id}")
    public void deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);
    }

    // Update Appointment
    @PutMapping("/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        return appointmentService.updateAppointment(id, appointment);
    }

    // Confirm Appointment
    @PutMapping("/{id}/confirm")
    public Appointment confirmAppointment(
            @PathVariable Long id) {

        return appointmentService.confirmAppointment(id);
    }

    // Complete Appointment
    @PutMapping("/{id}/complete")
    public Appointment completeAppointment(
            @PathVariable Long id) {

        return appointmentService.completeAppointment(id);
    }

    // Cancel Appointment
    @PutMapping("/{id}/cancel")
    public Appointment cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }

    // Get Appointments By Patient
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(
            @PathVariable Long patientId) {

        return appointmentService
                .getAppointmentsByPatient(patientId);
    }

    // Get Appointments By Doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(
            @PathVariable Long doctorId) {

        return appointmentService
                .getAppointmentsByDoctor(doctorId);
    }
}