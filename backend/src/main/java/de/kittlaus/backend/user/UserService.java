package de.kittlaus.backend.user;

import de.kittlaus.backend.models.user.MyUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    public Optional<MyUser> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public ResponseEntity<MyUser> createUser(MyUser user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body(MyUser.builder().build());
        }
        return ResponseEntity.ok(userRepo.save(user));
    }
}
