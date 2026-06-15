package hospital_management.service;

import hospital_management.dto.AuthRequest;
import hospital_management.dto.AuthResponse;
import hospital_management.dto.RegisterRequest;
import hospital_management.entity.User;
import hospital_management.entity.UserRole;
import hospital_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return new AuthResponse(false, "Email already in use");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        UserRole role = req.getRole() != null ? req.getRole() : UserRole.RECEPTIONIST;
        user.setRole(role);

        userRepository.save(user);

        return new AuthResponse(true, user.getRole().name(), user.getUsername());
    }

    public AuthResponse login(AuthRequest req) {
        return userRepository.findByEmail(req.getEmail())
                .map(user -> {
                    if (user.getPassword().equals(req.getPassword())) {
                        return new AuthResponse(true, user.getRole().name(), user.getUsername());
                    } else {
                        return new AuthResponse(false, "Invalid Credentials");
                    }
                })
                .orElseGet(() -> new AuthResponse(false, "Invalid Credentials"));
    }
}
