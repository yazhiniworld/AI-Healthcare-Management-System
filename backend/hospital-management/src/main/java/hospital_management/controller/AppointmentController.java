package hospital_management.controller;

import hospital_management.dto.AppointmentReportRequest;
import hospital_management.entity.Appointment;
import hospital_management.entity.PatientReport;
import hospital_management.service.AppointmentService;
import hospital_management.service.PatientReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PatientReportService patientReportService;

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

    @GetMapping("/doctor-user/{userId}")
    public List<Appointment> getAppointmentsByDoctorUser(
        @PathVariable Long userId) {

        return appointmentService
                .getAppointmentsByDoctorUser(userId);
    }

    @GetMapping("/patient-user/{userId}")
    public List<Appointment> getAppointmentsByPatientUser(
        @PathVariable Long userId) {

        return appointmentService
                .getAppointmentsByPatientUser(userId);
    }

    @PostMapping("/{id}/report")
    public PatientReport uploadReport(
            @PathVariable Long id,
            @RequestBody AppointmentReportRequest req) {

        Appointment appointment = appointmentService.getAppointmentById(id);

        PatientReport report = new PatientReport();
        report.setReportDate(req.getReportDate());
        report.setReportType(req.getReportType());
        report.setSummary(req.getSummary());
        report.setDetailsUrl(req.getDetailsUrl());
        report.setPatient(appointment.getPatient());

        return patientReportService.saveReport(report);
    }
}
