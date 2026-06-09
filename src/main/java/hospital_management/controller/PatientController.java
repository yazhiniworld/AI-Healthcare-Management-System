package hospital_management.controller;

import hospital_management.entity.Patient;
import hospital_management.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @PostMapping
    public Patient savePatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
                             @RequestBody Patient patient) {
    return patientService.updatePatient(id, patient);
}

@DeleteMapping("/{id}")
public String deletePatient(@PathVariable Long id) {

    patientService.deletePatient(id);

    return "Patient deleted successfully";
}
}