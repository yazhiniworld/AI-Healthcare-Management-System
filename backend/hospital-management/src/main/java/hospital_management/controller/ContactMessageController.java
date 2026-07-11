package hospital_management.controller;

import hospital_management.entity.ContactMessage;
import hospital_management.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/contact")
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping
    public ContactMessage sendMessage(@RequestBody ContactMessage message) {
        return contactMessageService.saveMessage(message);
    }
}
