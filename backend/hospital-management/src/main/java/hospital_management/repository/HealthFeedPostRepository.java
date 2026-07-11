package hospital_management.repository;

import hospital_management.entity.HealthFeedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthFeedPostRepository extends JpaRepository<HealthFeedPost, Long> {
}
