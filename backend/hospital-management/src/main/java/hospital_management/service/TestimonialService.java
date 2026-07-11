package hospital_management.service;

import hospital_management.entity.Testimonial;
import hospital_management.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialService {

    @Autowired
    private TestimonialRepository testimonialRepository;

    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    public Testimonial saveTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }
}
