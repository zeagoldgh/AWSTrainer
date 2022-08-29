package de.kittlaus.backend;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import de.kittlaus.backend.models.questions.Question;
import de.kittlaus.backend.models.security.Token;
import de.kittlaus.backend.questions.QuestionRepo;
import de.kittlaus.backend.user.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;


import java.util.List;
import java.util.Objects;

import static de.kittlaus.backend.Helper.*;
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
        Token token = getJWT("Droggelbecher92",restTemplate);
        Question question = Question.builder()
                .question("Was ist aws?")
                .answers(List.of("Bla","bla","bla","Cloudgedöns","bla"))
                .rightAnswers(List.of(true,false,false,false,true))
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
        Token token = getJWT("Droggelbecher92",restTemplate);
        Question question = Question.builder()
                .question("Was ist aws?")
                .answers(List.of("Bla","bla","bla","Cloudgedöns","bla"))
                .rightAnswers(List.of(true,false,false,false,true))
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
        Token token = getJWT("BadGuy",restTemplate);
        Question question = Question.builder()
                .question("Was ist aws?")
                .answers(List.of("Bla","bla","bla","Cloudgedöns","bla"))
                .rightAnswers(List.of(true,false,false,false,true))
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
        Token token = getJWT("Droggelbecher92",restTemplate);
        fillDBWithQuestions(20,token,restTemplate);
        //WHEN
        ResponseEntity<Question[]> actualResponse1 = restTemplate.exchange("/api/question/random/5", HttpMethod.GET, new HttpEntity<>(null,createHeaders(token.getToken())), Question[].class);
        ResponseEntity<Question[]> actualResponse2 = restTemplate.exchange("/api/question/random/5", HttpMethod.GET, new HttpEntity<>(null,createHeaders(token.getToken())), Question[].class);
        //THEN
        assertThat(actualResponse1.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(actualResponse2.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(Objects.requireNonNull(actualResponse1.getBody()).length).isEqualTo(5);
        assertThat(Objects.requireNonNull(actualResponse2.getBody()).length).isEqualTo(5);
        assertThat(actualResponse1.getBody()).isNotEqualTo(actualResponse2.getBody());

        ResponseEntity<Question[]> actualResponse = restTemplate.exchange("/api/question/category/CLOUD/5", HttpMethod.GET, new HttpEntity<>(null,createHeaders(token.getToken())), Question[].class);
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Question[] body = actualResponse.getBody();
        assert body != null;
        for (Question q : body){
            assertThat(q.getCategory()).isEqualTo(Category.CLOUD);
        }
    }


}
