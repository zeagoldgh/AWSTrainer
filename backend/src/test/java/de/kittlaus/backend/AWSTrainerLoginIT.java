package de.kittlaus.backend;

import de.kittlaus.backend.models.security.Credentials;
import de.kittlaus.backend.models.security.Token;
import de.kittlaus.backend.models.user.MyUser;
import de.kittlaus.backend.models.user.MyUserDto;
import de.kittlaus.backend.user.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AWSTrainerLoginIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepo userRepo;

    @AfterEach
    void cleanupDb() {
        userRepo.deleteAll();
    }

    @Test
    void shouldRegisterWithValidCredentials(){
        //GIVEN
        MyUser testUser = MyUser.builder().username("Kim").password("passwort").passwordAgain("passwort").build();
        //WHEN
        ResponseEntity<MyUserDto> actualResponse = restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        MyUserDto actual = actualResponse.getBody();
        assert actual != null;
        assertThat(actual.getRole()).isEqualTo("USER");
        assertThat(actual.getUsername()).isEqualTo("Kim");
    }

    @Test
    void shouldFailWithExistingUsername(){
        //GIVEN
        MyUser testUser = MyUser.builder().username("Kim").password("passwort").passwordAgain("passwort").build();
        restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        //WHEN
        ResponseEntity<MyUserDto> actualResponse = restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void shouldFailWithDifferentPasswords(){
        //GIVEN
        MyUser testUser = MyUser.builder().username("Kim").password("passwort").passwordAgain("passwort!").build();
        //WHEN
        ResponseEntity<MyUserDto> actualResponse = restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void shouldNotLoginWithWrongCredentials(){
        //GIVEN
        Credentials testCredentials = Credentials.builder().username("Kim").password("passwort").build();
        //WHEN
        ResponseEntity<Token> actualResponse = restTemplate.postForEntity("/auth", testCredentials, Token.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void shouldLoginWithValidCredentials(){
        //GIVEN
        MyUser testUser = MyUser.builder().username("Kim").password("passwort").passwordAgain("passwort").build();
        Credentials testCredentials = Credentials.builder().username("Kim").password("passwort").build();
        restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        //WHEN
        ResponseEntity<Token> actualResponse = restTemplate.postForEntity("/auth", testCredentials, Token.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Token actual = actualResponse.getBody();
        assert actual != null;
    }



}
