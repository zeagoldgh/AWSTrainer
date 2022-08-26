package de.kittlaus.backend.models.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyUserDto {
    private String username;
    private String role;
}
