package hospital_management.repository;

import hospital_management.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findBySpecialization(String specialization);

    List<Doctor> findByExperience(int experience);

    List<Doctor> findByDoctorNameContainingIgnoreCaseOrSpecializationContainingIgnoreCase(String name, String specialization);

    Doctor findByUserUserId(Long userId);

}