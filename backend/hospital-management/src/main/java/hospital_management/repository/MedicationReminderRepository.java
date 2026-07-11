package hospital_management.repository;

import hospital_management.entity.MedicationReminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicationReminderRepository extends JpaRepository<MedicationReminder, Long> {
    List<MedicationReminder> findByPatientUserUserId(Long userId);
}
