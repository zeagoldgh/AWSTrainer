package de.kittlaus.backend;

import de.kittlaus.backend.answers.AnswerRepo;
import de.kittlaus.backend.models.answers.GivenAnswer;
import de.kittlaus.backend.models.answers.ValidatedAnswer;
import de.kittlaus.backend.models.questions.Question;
import de.kittlaus.backend.models.security.Token;
import de.kittlaus.backend.questions.QuestionRepo;
import de.kittlaus.backend.user.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Objects;

import static de.kittlaus.backend.Helper.*;
import static de.kittlaus.backend.Helper.createHeaders;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AnswerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private QuestionRepo questionRepo;

    @Autowired
    private AnswerRepo answerRepo;

    @BeforeEach
    void cleanupDb() {
        userRepo.deleteAll();
        questionRepo.deleteAll();
        answerRepo.deleteAll();
    }

    @Test
    void shouldValidate5AllCorrectAnswers(){
        //GIVEN
        Token token = getJWT("Droggelbecher92",restTemplate);
        fillDBWithQuestions(20,token,restTemplate);
        Question[] questions = restTemplate.exchange("/api/question/random/5", HttpMethod.GET, new HttpEntity<>(null,createHeaders(token.getToken())), Question[].class).getBody();
        assert questions != null;
        GivenAnswer a1 = GivenAnswer.builder().givenAnswers(questions[0].getRightAnswers()).questionId(questions[0].getId()).build();
        GivenAnswer a2 = GivenAnswer.builder().givenAnswers(questions[1].getRightAnswers()).questionId(questions[1].getId()).build();
        GivenAnswer a3 = GivenAnswer.builder().givenAnswers(questions[2].getRightAnswers()).questionId(questions[2].getId()).build();
        GivenAnswer a4 = GivenAnswer.builder().givenAnswers(questions[3].getRightAnswers()).questionId(questions[3].getId()).build();
        GivenAnswer a5 = GivenAnswer.builder().givenAnswers(questions[4].getRightAnswers()).questionId(questions[4].getId()).build();
        List<GivenAnswer> givenAnswers = List.of(a1,a2,a3,a4,a5);
        //WHEN
        ResponseEntity<ValidatedAnswer> actualResponse = restTemplate.exchange("/api/answer", HttpMethod.POST, new HttpEntity<>(givenAnswers, createHeaders(token.getToken())), ValidatedAnswer.class);
        //THEN
        assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        ValidatedAnswer actual = actualResponse.getBody();
        assert actual != null;
        assertThat(actual.getValidatedAnswers().size()).isEqualTo(5);
        assertThat(actual.getValidatedAnswers().get(0).getPossibleAnswers()).isEqualTo(questions[0].getAnswers());
        assertThat(actual.getValidatedAnswers().get(1).getCorrectlyAnswers()).isEqualTo(List.of(true,true,true,true,true));
        assertThat(actual.getId()).isNotBlank();
        assertThat(actual.getValidatedAnswers().get(4).getGivenAnswers()).isEqualTo(List.of(true,false,false,false,true));

    }






}
