package hospital_management.service;

import hospital_management.entity.HealthFeedPost;
import hospital_management.repository.HealthFeedPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthFeedService {

    @Autowired
    private HealthFeedPostRepository healthFeedPostRepository;

    public List<HealthFeedPost> getAllPosts() {
        return healthFeedPostRepository.findAll();
    }

    public HealthFeedPost savePost(HealthFeedPost post) {
        return healthFeedPostRepository.save(post);
    }
}
