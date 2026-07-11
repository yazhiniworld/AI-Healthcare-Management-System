package hospital_management.controller;

import hospital_management.entity.HealthFeedPost;
import hospital_management.service.HealthFeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/feed")
public class HealthFeedController {

    @Autowired
    private HealthFeedService healthFeedService;

    @GetMapping
    public List<HealthFeedPost> getFeed() {
        return healthFeedService.getAllPosts();
    }

    @PostMapping
    public HealthFeedPost addFeedPost(@RequestBody HealthFeedPost post) {
        return healthFeedService.savePost(post);
    }
}
