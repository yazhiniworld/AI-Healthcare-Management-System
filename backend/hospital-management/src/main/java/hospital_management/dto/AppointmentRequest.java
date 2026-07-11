package hospital_management.dto;

public class AppointmentRequest {
    private Long patientUserId;
    private Long doctorId;
    private String appointmentDate;
    private String appointmentTime;
    private String consultationMode;
    private String reason;

    public Long getPatientUserId() {
        return patientUserId;
    }

    public void setPatientUserId(Long patientUserId) {
        this.patientUserId = patientUserId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getConsultationMode() {
        return consultationMode;
    }

    public void setConsultationMode(String consultationMode) {
        this.consultationMode = consultationMode;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
