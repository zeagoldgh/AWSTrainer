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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;


import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class QuestionIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private QuestionRepo questionRepo;

    @BeforeEach
    void cleanupDb() {
        userRepo.deleteAll();
        questionRepo.deleteAll();
    }



    @Test
    void shouldPostNewQuestion(){
        //GIVEN
        Token token = getJWT("Droggelbecher92");
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
        Token token = getJWT("Droggelbecher92");
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
    }

    @Test
    void shouldNotPostQuestionIfNotDroggelbecher92(){
        //GIVEN
        Token token = getJWT("BadGuy");
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
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void shouldGet5RandomQuestions(){
        //GIVEN
        Token token = getJWT("Droggelbecher92");
        fillDBWithQuestions(20,token);
        //WHEN
        ResponseEntity<Question[]> actualResponse1 = restTemplate.exchange("/api/question/random/5", HttpMethod.GET, new HttpEntity<>(null,createHeaders(token.getToken())), Question[].class);
        ResponseEntity<Question[]> actualResponse2 = restTemplate.exchange("/api/question/random/5", HttpMethod.GET, new HttpEntity<>(null,createHeaders(token.getToken())), Question[].class);
        //THEN
        assertThat(actualResponse1.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(actualResponse2.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(Objects.requireNonNull(actualResponse1.getBody()).length).isEqualTo(5);
        assertThat(Objects.requireNonNull(actualResponse2.getBody()).length).isEqualTo(5);
        assertThat(actualResponse1.getBody()).isNotEqualTo(actualResponse2.getBody());
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

    void fillDBWithQuestions(int howMany, Token token){
        Question question;
        for (int counter = 1; counter <= howMany; counter++) {
            question = Question.builder()
                    .question("Was ist aws?"+counter)
                    .answers(new String[]{"Bla","bla","bla","Cloudgedöns","bla"})
                    .indexRightAnswer(new int[]{3})
                    .category(generateCategory(counter))
                    .certType(CertType.CLF_C01)
                    .build();
            restTemplate.exchange("/api/question", HttpMethod.POST, new HttpEntity<>(question,createHeaders(token.getToken())), Question.class);

        }

    }

    Category generateCategory(int counter){
        int num = counter%4;
        Category category;
        switch (num){
            case 1 -> category = Category.CLOUD;
            case 2 -> category = Category.BILLING;
            case 3 -> category = Category.SECURITY;
            default -> category = Category.TECHNOLOGY;
        }
        return category;
    }

}
