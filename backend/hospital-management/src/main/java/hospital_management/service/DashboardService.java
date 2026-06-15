package hospital_management.service;

import hospital_management.dto.DashboardStats;
import hospital_management.entity.AppointmentStatus;
import hospital_management.repository.AppointmentRepository;
import hospital_management.repository.DoctorRepository;
import hospital_management.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardStats getDashboardStats() {

        DashboardStats stats = new DashboardStats();

        stats.setTotalPatients(patientRepository.count());

        stats.setTotalDoctors(doctorRepository.count());

        stats.setTotalAppointments(
                appointmentRepository.count());

        stats.setPendingAppointments(
                appointmentRepository.countByStatus(
                        AppointmentStatus.PENDING));

        stats.setCompletedAppointments(
                appointmentRepository.countByStatus(
                        AppointmentStatus.COMPLETED));

        stats.setCancelledAppointments(
                appointmentRepository.countByStatus(
                        AppointmentStatus.CANCELLED));

        return stats;
    }
}