package hospital_management.dto;

import hospital_management.entity.UserRole;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private UserRole role;
    private String phone;
    private String specialization;
    private String licenseNumber;
    private Integer experience;
    private String certificatePath;
    private String photoPath;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
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

public String getLicenseNumber() {
    return licenseNumber;
}

public void setLicenseNumber(String licenseNumber) {
    this.licenseNumber = licenseNumber;
}

public Integer getExperience() {
    return experience;
}

public void setExperience(Integer experience) {
    this.experience = experience;
}

public String getCertificatePath() {
    return certificatePath;
}

public void setCertificatePath(String certificatePath) {
    this.certificatePath = certificatePath;
}

public String getPhotoPath() {
    return photoPath;
}

public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
}
}
