package hospital_management.service;

import hospital_management.entity.PatientReport;
import hospital_management.repository.PatientReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientReportService {

    @Autowired
    private PatientReportRepository patientReportRepository;

    public List<PatientReport> getReportsByPatientUser(Long userId) {
        return patientReportRepository.findByPatientUserUserId(userId);
    }

    public PatientReport saveReport(PatientReport report) {
        return patientReportRepository.save(report);
    }
}
