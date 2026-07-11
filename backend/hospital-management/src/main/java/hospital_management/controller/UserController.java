package hospital_management.controller;

import hospital_management.dto.AuthRequest;
import hospital_management.dto.AuthResponse;
import hospital_management.dto.RegisterRequest;
import hospital_management.dto.UpdateUserRequest;
import hospital_management.dto.UserDto;
import hospital_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import hospital_management.entity.User;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        System.out.println("Incoming RegisterRequest: " + req);
        AuthResponse response = userService.register(req);
        System.out.println("Register response: " + response);
        return response;
    }

    @PostMapping("/auth/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        return userService.login(req);
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}")
    public UserDto updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest req) {
        return userService.updateUser(id, req);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/users/{id}/approve")
    public User approveDoctor(@PathVariable Long id) {
    return userService.approveDoctor(id);
    }
}
