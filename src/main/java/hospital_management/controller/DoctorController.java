package hospital_management.controller;

import hospital_management.entity.Doctor;
import hospital_management.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Get All Doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Save Doctor
    @PostMapping
    public Doctor saveDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    // Delete Doctor
    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
    }

    // Update Doctor
    @PutMapping("/{id}")
    public Doctor updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(id, doctor);
    }

    @GetMapping("/specialization/{specialization}")
public List<Doctor> getDoctorsBySpecialization(
        @PathVariable String specialization) {

    return doctorService.getDoctorsBySpecialization(specialization);
}

@GetMapping("/experience/{experience}")
public List<Doctor> getDoctorsByExperience(
        @PathVariable int experience) {

    return doctorService.getDoctorsByExperience(experience);
}
}