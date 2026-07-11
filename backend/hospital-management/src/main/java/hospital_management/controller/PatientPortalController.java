package hospital_management.controller;

import hospital_management.dto.AppointmentRequest;
import hospital_management.entity.Appointment;
import hospital_management.entity.Doctor;
import hospital_management.entity.MedicationReminder;
import hospital_management.entity.Patient;
import hospital_management.entity.PatientReport;
import hospital_management.service.AppointmentService;
import hospital_management.service.DoctorService;
import hospital_management.service.MedicationReminderService;
import hospital_management.service.PatientReportService;
import hospital_management.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/patient")
public class PatientPortalController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private MedicationReminderService medicationReminderService;

    @Autowired
    private PatientReportService patientReportService;

    @GetMapping("/profile/{userId}")
    public Patient getPatientProfile(@PathVariable Long userId) {
        return patientService.getPatientByUserId(userId);
    }

    @GetMapping("/appointments/{userId}")
    public List<Appointment> getPatientAppointments(@PathVariable Long userId) {
        return appointmentService.getAppointmentsByPatientUser(userId);
    }

    @GetMapping("/doctors")
    public List<Doctor> getDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/doctors/search")
    public List<Doctor> searchDoctors(@RequestParam(required = false) String q) {
        if (q == null || q.isBlank()) {
            return doctorService.getAllDoctors();
        }
        return doctorService.searchDoctors(q);
    }

    @GetMapping("/doctors/specialization/{specialization}")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorService.getDoctorsBySpecialization(specialization);
    }

    @PostMapping("/appointments")
    public Appointment bookAppointment(@RequestBody AppointmentRequest req) {
        Patient patient = patientService.getPatientByUserId(req.getPatientUserId());
        Doctor doctor = doctorService.getDoctorById(req.getDoctorId());

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(req.getAppointmentDate());
        appointment.setAppointmentTime(req.getAppointmentTime());
        appointment.setConsultationMode(req.getConsultationMode());
        appointment.setReason(req.getReason());

        return appointmentService.saveAppointment(appointment);
    }

    @PutMapping("/appointments/{id}/cancel")
    public Appointment cancelAppointment(@PathVariable Long id) {
        return appointmentService.cancelAppointment(id);
    }

    @GetMapping("/reminders/{userId}")
    public List<MedicationReminder> getMedicationReminders(@PathVariable Long userId) {
        return medicationReminderService.getRemindersByPatientUser(userId);
    }

    @GetMapping("/reports/{userId}")
    public List<PatientReport> getReports(@PathVariable Long userId) {
        return patientReportService.getReportsByPatientUser(userId);
    }
}
