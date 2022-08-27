package de.kittlaus.backend.user;

import de.kittlaus.backend.models.user.MyUser;
import de.kittlaus.backend.models.user.MyUserDto;
import de.kittlaus.backend.models.user.TrainerUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public Optional<TrainerUser> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public ResponseEntity<MyUserDto> createUser(MyUser user) {
        TrainerUser save = TrainerUser.builder().role(user.getRole()).username(user.getUsername()).password(user.getPassword()).examsTaken(new ArrayList<>()).build();
        TrainerUser savedUser = userRepo.save(save);
        return ResponseEntity.status(HttpStatus.CREATED).body(MyUserDto.builder().role(savedUser.getRole()).username(savedUser.getUsername()).build());
    }

    public ResponseEntity<MyUserDto> checkAndCreate(MyUser user) {
        if (!user.getPassword().equals(user.getPasswordAgain())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(MyUserDto.builder().build());
        } else if (userRepo.findByUsername(user.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body(MyUserDto.builder().build());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("USER");
            return createUser(user);
        }

    }
}
