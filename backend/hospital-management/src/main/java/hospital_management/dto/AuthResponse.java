package hospital_management.dto;

public class AuthResponse {

    private boolean success;
    private Long userId;
    private String role;
    private String username;
    private boolean approved;
    private String phone;
    private String specialization;
    private String message;

    public AuthResponse() {}

    public AuthResponse(boolean success, Long userId, String role, String username, boolean approved, String phone, String specialization) {
        this.success = success;
        this.userId = userId;
        this.role = role;
        this.username = username;
        this.approved = approved;
        this.phone = phone;
        this.specialization = specialization;
    }

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
