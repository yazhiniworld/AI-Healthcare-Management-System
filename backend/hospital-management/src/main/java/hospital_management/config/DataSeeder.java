package hospital_management.config;

import hospital_management.entity.Doctor;
import hospital_management.entity.HealthFeedPost;
import hospital_management.entity.Testimonial;
import hospital_management.repository.DoctorRepository;
import hospital_management.repository.HealthFeedPostRepository;
import hospital_management.repository.TestimonialRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(
            DoctorRepository doctorRepository,
            HealthFeedPostRepository feedRepository,
            TestimonialRepository testimonialRepository
    ) {
        return args -> {
            if (doctorRepository.count() == 0) {
                Doctor doctor1 = new Doctor();
                doctor1.setDoctorName("Dr. Maya Singh");
                doctor1.setSpecialization("Cardiology");
                doctor1.setExperience(14);
                doctor1.setPhone("(555) 014-1123");
                doctorRepository.save(doctor1);

                Doctor doctor2 = new Doctor();
                doctor2.setDoctorName("Dr. Ayaan Patel");
                doctor2.setSpecialization("Neurology");
                doctor2.setExperience(11);
                doctor2.setPhone("(555) 019-4456");
                doctorRepository.save(doctor2);

                Doctor doctor3 = new Doctor();
                doctor3.setDoctorName("Dr. Leila Johnson");
                doctor3.setSpecialization("Pediatrics");
                doctor3.setExperience(9);
                doctor3.setPhone("(555) 018-7789");
                doctorRepository.save(doctor3);
            }

            if (feedRepository.count() == 0) {
                HealthFeedPost post1 = new HealthFeedPost();
                post1.setTitle("AI Reduces Waiting Times in Outpatient Clinics");
                post1.setCategory("Operations");
                post1.setExcerpt("New workflow automation is helping hospitals reduce appointment backlogs.");
                post1.setImageUrl("");
                post1.setPublishedAt("June 2026");
                post1.setContent("Doctors and staff are now using predictive scheduling to optimize patient flow.");
                feedRepository.save(post1);

                HealthFeedPost post2 = new HealthFeedPost();
                post2.setTitle("Virtual Consultations Expand Care Access" );
                post2.setCategory("Telehealth");
                post2.setExcerpt("Clinics report a 35% increase in virtual follow-up efficiency.");
                post2.setImageUrl("");
                post2.setPublishedAt("May 2026");
                post2.setContent("Video visits and remote monitoring improve outcomes for chronic care patients.");
                feedRepository.save(post2);
            }

            if (testimonialRepository.count() == 0) {
                Testimonial testimonial1 = new Testimonial();
                testimonial1.setName("Priya Sharma");
                testimonial1.setRole("Hospital Director");
                testimonial1.setCompany("City Health Center");
                testimonial1.setQuote("HealthPlus transformed our appointment process and helps patients feel cared for from first click to discharge.");
                testimonialRepository.save(testimonial1);

                Testimonial testimonial2 = new Testimonial();
                testimonial2.setName("Dr. Samuel Park");
                testimonial2.setRole("Senior Physician");
                testimonial2.setCompany("Harmony Clinic");
                testimonial2.setQuote("The verification and scheduling workflow is smooth. My team can now focus more on patients than paperwork.");
                testimonialRepository.save(testimonial2);
            }
        };
    }
}
