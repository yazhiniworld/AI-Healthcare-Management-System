package hospital_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, columnDefinition = "varchar(50)")
    private UserRole role;

    @Column(nullable = false)
    private boolean approved;

    @Column
    private String phone;

    @Column
    private String specialization;

    @Column
    private String licenseNumber;

    @Column
    private Integer experience;

    @Column(length = 500)
    private String certificatePath;

    @Column(length = 500)
    private String photoPath;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

public String getPhotoPath() {
    return photoPath;
}

public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
}
}

