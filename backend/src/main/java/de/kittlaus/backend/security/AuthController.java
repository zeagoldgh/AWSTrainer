package de.kittlaus.backend.security;

import de.kittlaus.backend.models.security.Credentials;
import de.kittlaus.backend.models.security.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @PostMapping
    public Token login(@RequestBody Credentials loginData) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword()));

            Map<String, Object> claims = new HashMap<>();
            claims.put("roles", getRoles(auth));
            return Token.builder().token(jwtService.createToken(claims, loginData.getUsername())).build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }

    private List<String> getRoles(Authentication auth) {
        return auth.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

    }
}
