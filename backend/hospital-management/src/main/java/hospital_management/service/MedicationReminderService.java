package hospital_management.service;

import hospital_management.entity.MedicationReminder;
import hospital_management.repository.MedicationReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicationReminderService {

    @Autowired
    private MedicationReminderRepository medicationReminderRepository;

    public List<MedicationReminder> getRemindersByPatientUser(Long userId) {
        return medicationReminderRepository.findByPatientUserUserId(userId);
    }

}
