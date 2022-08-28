package de.kittlaus.backend;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import de.kittlaus.backend.models.questions.Question;
import de.kittlaus.backend.models.security.Credentials;
import de.kittlaus.backend.models.security.Token;
import de.kittlaus.backend.models.user.MyUser;
import de.kittlaus.backend.models.user.MyUserDto;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.util.List;

public class Helper {

    //Hilfsmethoden

    static Token getJWT(String username, TestRestTemplate restTemplate){
        MyUser testUser = MyUser.builder().username(username).password("passwort").passwordAgain("passwort").build();
        Credentials credentials = Credentials.builder().password("passwort").username(username).build();
        restTemplate.postForEntity("/api/user", testUser, MyUserDto.class);
        return restTemplate.postForEntity("/auth",credentials, Token.class).getBody();
    }

    static HttpHeaders createHeaders(String jwt) {
        String authHeaderValue = "Bearer " + jwt;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeaderValue);
        return headers;
    }

    static void fillDBWithQuestions(int howMany, Token token, TestRestTemplate restTemplate){
        Question question;
        for (int counter = 1; counter <= howMany; counter++) {
            question = Question.builder()
                    .question("Was ist aws?"+counter)
                    .answers(List.of("Bla","bla","bla","Cloudgedöns","bla"))
                    .rightAnswers(List.of(true,false,false,false,true))
                    .category(generateCategory(counter))
                    .certType(CertType.CLF_C01)
                    .build();
            restTemplate.exchange("/api/question", HttpMethod.POST, new HttpEntity<>(question,createHeaders(token.getToken())), Question.class);

        }

    }

    static Category generateCategory(int counter){
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
