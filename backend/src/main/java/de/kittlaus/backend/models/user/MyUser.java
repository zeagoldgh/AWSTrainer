package de.kittlaus.backend.models.user;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;


@Data
@Builder
public class MyUser {

    @Id
    private String id;

    private String username;
    private String password;
    private String role;


}

