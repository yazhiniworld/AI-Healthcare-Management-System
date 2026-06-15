package hospital_management.service;

import hospital_management.entity.Doctor;
import hospital_management.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Save Doctor
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Delete Doctor
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    // Update Doctor
    public Doctor updateDoctor(Long id, Doctor doctor) {
        doctor.setDoctorId(id);
        return doctorRepository.save(doctor);
    }
    //  Get Doctors by Specialization
    public List<Doctor> getDoctorsBySpecialization(String specialization) {
    return doctorRepository.findBySpecialization(specialization);
    }
    // Get Doctors by Experience
    public List<Doctor> getDoctorsByExperience(int experience) {
    return doctorRepository.findByExperience(experience);
    }
}