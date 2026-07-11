package hospital_management.dto;

import hospital_management.entity.UserRole;

public class UserDto {

private Long userId;
private String username;
private String email;
private UserRole role;
private boolean approved;

private String phone;
private String specialization;
private String licenseNumber;
private Integer experience;
private String certificatePath;
    private String photoPath;

public UserDto(
        Long userId,
        String username,
        String email,
        UserRole role,
        boolean approved,
        String phone,
        String specialization,
        String licenseNumber,
        Integer experience,
        String certificatePath,
        String photoPath
) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.role = role;
    this.approved = approved;
    this.phone = phone;
    this.specialization = specialization;
    this.licenseNumber = licenseNumber;
    this.experience = experience;
    this.certificatePath = certificatePath;
    this.photoPath = photoPath;
}

public Long getUserId() {
    return userId;
}

public void setUserId(Long userId) {
    this.userId = userId;
}

public String getPhotoPath() {
    return photoPath;
}

public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
}

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

public UserRole getRole() {
    return role;
}

public void setRole(UserRole role) {
    this.role = role;
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


}
