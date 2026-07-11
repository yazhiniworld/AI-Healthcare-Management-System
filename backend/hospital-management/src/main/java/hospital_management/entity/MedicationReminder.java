package hospital_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medication_reminders")
public class MedicationReminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId;

    private String title;
    private String scheduledAt;
    private String note;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public Long getReminderId() {
        return reminderId;
    }

    public void setReminderId(Long reminderId) {
        this.reminderId = reminderId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(String scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
