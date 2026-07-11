package hospital_management.service;

import hospital_management.entity.ContactMessage;
import hospital_management.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public ContactMessage saveMessage(ContactMessage message) {
        return contactMessageRepository.save(message);
    }
}
