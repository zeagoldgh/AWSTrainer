package de.kittlaus.backend;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import de.kittlaus.backend.models.questions.Question;
import de.kittlaus.backend.models.security.Credentials;
import de.kittlaus.backend.models.security.Token;
import de.kittlaus.backend.models.user.MyUser;
import de.kittlaus.backend.models.user.MyUserDto;
import de.kittlaus.backend.questions.QuestionRepo;
import de.kittlaus.backend.user.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class QuestionIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private QuestionRepo questionRepo;

    @AfterEach
    void cleanupDb() {
        userRepo.deleteAll();
        questionRepo.deleteAll();
    }


    @Test
    void shouldPostNewQuestion(){
        //GIVEN
        Token token = getJWT("Kim");
        Question question = Question.builder()
                .question("Was ist aws?")
                .answers(new String[]{"Bla","bla","bla","Cloudgedöns","bla"})
                .indexRightAnswer(new int[]{3})
                .category(Category.CLOUD)
                .certType(CertType.CLF_C01)
                .build();
        //WHEN
        ResponseEntity<Question> actualResponse = restTemplate.exchange("/api/question", HttpMethod.POST, new HttpEntity<>(question,createHeaders(token.getToken())), Question.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Question actual = actualResponse.getBody();
        assert actual != null;
    }

    @Test
    void shouldNotPostQuestionAlreadyPresent(){
        //GIVEN
        Token token = getJWT("Kim");
        Question question = Question.builder()
                .question("Was ist aws?")
                .answers(new String[]{"Bla","bla","bla","Cloudgedöns","bla"})
                .indexRightAnswer(new int[]{3})
                .category(Category.CLOUD)
                .certType(CertType.CLF_C01)
                .build();
        restTemplate.exchange("/api/question", HttpMethod.POST, new HttpEntity<>(question,createHeaders(token.getToken())), Question.class);
        //WHEN
        ResponseEntity<Question> actualResponse = restTemplate.exchange("/api/question", HttpMethod.POST, new HttpEntity<>(question,createHeaders(token.getToken())), Question.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        Question actual = actualResponse.getBody();
        assert actual != null;
    }




    //Hilfsmethoden

    Token getJWT(String username){
        MyUser testUser = MyUser.builder().username(username).password("passwort").passwordAgain("passwort").build();
        Credentials credentials = Credentials.builder().password("passwort").username(username).build();
        restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        return restTemplate.postForEntity("/auth",credentials, Token.class).getBody();
    }

    HttpHeaders createHeaders(String jwt) {
        String authHeaderValue = "Bearer " + jwt;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeaderValue);
        return headers;
    }

}
