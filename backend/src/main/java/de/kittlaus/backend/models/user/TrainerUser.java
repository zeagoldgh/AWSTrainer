package de.kittlaus.backend.models.user;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
public class TrainerUser {

    @Id
    private String id;

    private String username;
    private String password;
    private String role;
    private List<String> examsTaken;


}
