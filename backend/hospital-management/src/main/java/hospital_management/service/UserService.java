package hospital_management.service;

import hospital_management.dto.AuthRequest;
import hospital_management.dto.AuthResponse;
import hospital_management.dto.RegisterRequest;
import hospital_management.dto.UpdateUserRequest;
import hospital_management.dto.UserDto;

import hospital_management.entity.User;
import hospital_management.entity.UserRole;
import hospital_management.entity.Doctor;
import hospital_management.entity.Patient;

import hospital_management.repository.UserRepository;
import hospital_management.repository.DoctorRepository;
import hospital_management.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


@Autowired
private UserRepository userRepository;

@Autowired
private DoctorRepository doctorRepository;

@Autowired
private PatientRepository patientRepository;

// REGISTER USER
public AuthResponse register(RegisterRequest req) {

if (req == null
        || !StringUtils.hasText(req.getUsername())
        || !StringUtils.hasText(req.getEmail())
        || !StringUtils.hasText(req.getPassword())
        || req.getRole() == null) {

    return new AuthResponse(
            false,
            "All fields are required"
    );
}

if (userRepository.existsByEmail(
        req.getEmail().trim()
)) {

    return new AuthResponse(
            false,
            "Email already exists"
    );
}

if (req.getRole() == UserRole.ADMIN) {

  return new AuthResponse(
           false,
          "Admin registration not allowed"
   );
}

User user = new User();

user.setUsername(
        req.getUsername().trim()
);

user.setEmail(
        req.getEmail().trim()
);

user.setPassword(
        req.getPassword()
);

user.setRole(
        req.getRole()
);

user.setPhone(
        req.getPhone()
);

user.setSpecialization(
        req.getSpecialization()
);

user.setLicenseNumber(
        req.getLicenseNumber()
);

user.setExperience(
        req.getExperience()
);

user.setCertificatePath(
        req.getCertificatePath()
);

user.setPhotoPath(
        req.getPhotoPath()
);

if (req.getRole() == UserRole.DOCTOR) {
    user.setApproved(false);
} else {
    user.setApproved(true);
}

System.out.println("Registering user: " + user);

User savedUser =
        userRepository.save(user);

System.out.println("Saved user: " + savedUser);

if (savedUser.getRole() == UserRole.PATIENT) {

    System.out.println("Creating patient record for user: " + savedUser.getUsername());

    Patient patient = new Patient();

    patient.setPatientName(
            savedUser.getUsername()
    );

    patient.setPhone(
            savedUser.getPhone()
    );

    patient.setAge(0);

    patient.setGender("");

    patient.setBloodGroup("");

    patient.setAddress("");

    patient.setDisease("");

    patient.setStatus("ACTIVE");

    patient.setUser(savedUser);

    patientRepository.save(patient);
    System.out.println("Created patient record for user: " + savedUser.getUsername());
} else if (savedUser.getRole() == UserRole.DOCTOR) {

    System.out.println("Creating doctor record for user: " + savedUser.getUsername());

    Doctor doctor = new Doctor();

    doctor.setDoctorName(savedUser.getUsername());
    doctor.setSpecialization(savedUser.getSpecialization());
    doctor.setExperience(savedUser.getExperience() == null ? 0 : savedUser.getExperience());
    doctor.setPhone(savedUser.getPhone());
    doctor.setUser(savedUser);

    doctorRepository.save(doctor);
    System.out.println("Created doctor record for user: " + savedUser.getUsername());
}

return new AuthResponse(
        true,
        "Registration successful"
);

}


// LOGIN
public AuthResponse login(AuthRequest req) {

    return userRepository.findByEmail(req.getEmail())
            .map(user -> {

                if (user.getPassword().equals(req.getPassword())) {

                    if (user.getRole() == UserRole.DOCTOR
                            && !user.isApproved()) {

                        return new AuthResponse(
                                false,
                                "Waiting for admin approval"
                        );
                    }

                    return new AuthResponse(
                            true,
                            user.getUserId(),
                            user.getRole().name(),
                            user.getUsername(),
                            user.isApproved(),
                            user.getPhone(),
                            user.getSpecialization()
                    );
                }

                return new AuthResponse(
                        false,
                        "Invalid Credentials"
                );

            })
            .orElseGet(() ->
                    new AuthResponse(
                            false,
                            "Invalid Credentials"
                    )
            );
}

// GET ALL USERS
public List<UserDto> getAllUsers() {

    return userRepository.findAll()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
}

// GET USER BY ID
public UserDto getUserById(Long id) {

    return userRepository.findById(id)
            .map(this::toDto)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "User not found"
                    ));
}

// UPDATE USER
public UserDto updateUser(
        Long id,
        UpdateUserRequest req
) {

    User user = userRepository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "User not found"
                    ));

    user.setUsername(req.getUsername());
    user.setEmail(req.getEmail());
    user.setRole(req.getRole());

    return toDto(
            userRepository.save(user)
    );
}

// DELETE USER
public void deleteUser(Long id) {

    User user = userRepository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "User not found"
                    ));

    userRepository.delete(user);
}

// APPROVE DOCTOR
public User approveDoctor(Long id) {

    User user = userRepository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Doctor not found"
                    ));

    user.setApproved(true);

    return userRepository.save(user);
}

// DTO CONVERTER
private UserDto toDto(User user) {

    return new UserDto(
            user.getUserId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.isApproved(),
            user.getPhone(),
            user.getSpecialization(),
            user.getLicenseNumber(),
            user.getExperience(),
            user.getCertificatePath(),
            user.getPhotoPath()
    );
}


}
