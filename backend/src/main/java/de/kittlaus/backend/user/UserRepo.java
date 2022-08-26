package de.kittlaus.backend.user;

import de.kittlaus.backend.models.user.MyUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<MyUser,String> {

        Optional<MyUser> findByUsername(String username);


}
