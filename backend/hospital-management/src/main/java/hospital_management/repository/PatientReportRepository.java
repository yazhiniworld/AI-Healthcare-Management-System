package hospital_management.repository;

import hospital_management.entity.PatientReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientReportRepository extends JpaRepository<PatientReport, Long> {
    List<PatientReport> findByPatientUserUserId(Long userId);
}
