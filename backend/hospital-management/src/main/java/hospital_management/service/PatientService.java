package hospital_management.service;

import hospital_management.entity.Patient;
import hospital_management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public void deletePatient(Long id) {
    patientRepository.deleteById(id);
}

    public Patient updatePatient(Long id, Patient patientDetails) {

    Patient patient = patientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

    patient.setPatientName(patientDetails.getPatientName());
    patient.setAge(patientDetails.getAge());
    patient.setGender(patientDetails.getGender());
    patient.setPhone(patientDetails.getPhone());

    return patientRepository.save(patient);
}
}

