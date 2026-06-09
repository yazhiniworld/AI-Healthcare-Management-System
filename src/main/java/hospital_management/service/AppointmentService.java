package hospital_management.service;

import hospital_management.entity.Appointment;
import hospital_management.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Save Appointment
    public Appointment saveAppointment(Appointment appointment) {

    boolean alreadyBooked =
            appointmentRepository
            .existsByDoctorDoctorIdAndAppointmentDateAndAppointmentTime(
                    appointment.getDoctor().getDoctorId(),
                    appointment.getAppointmentDate(),
                    appointment.getAppointmentTime()
            );

    if (alreadyBooked) {
        throw new RuntimeException(
                "Doctor already has an appointment at this time!"
        );
    }

    return appointmentRepository.save(appointment);
}

    // Get All Appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Delete Appointment
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {
    appointment.setAppointmentId(id);
    return appointmentRepository.save(appointment);
}
}