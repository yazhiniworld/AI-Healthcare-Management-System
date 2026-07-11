package hospital_management.controller;

import hospital_management.entity.Testimonial;
import hospital_management.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/testimonials")
public class TestimonialController {

    @Autowired
    private TestimonialService testimonialService;

    @GetMapping
    public List<Testimonial> getTestimonials() {
        return testimonialService.getAllTestimonials();
    }

    @PostMapping
    public Testimonial addTestimonial(@RequestBody Testimonial testimonial) {
        return testimonialService.saveTestimonial(testimonial);
    }
}
