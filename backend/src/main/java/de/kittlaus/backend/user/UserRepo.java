package de.kittlaus.backend.user;

import de.kittlaus.backend.models.user.MyUser;
import de.kittlaus.backend.models.user.TrainerUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<TrainerUser,String> {

        Optional<TrainerUser> findByUsername(String username);


}
