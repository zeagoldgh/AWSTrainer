package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import de.kittlaus.backend.models.questions.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<Question> postNewQuestion(@RequestBody Question newQuestion, Principal principal){
        if (!principal.getName().equals("Droggelbecher92")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Question.builder().build());
        }
        try {
            Question question = questionService.saveNewQuestion(newQuestion);
            return ResponseEntity.status(HttpStatus.CREATED).body(question);
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(Question.builder().build());
        }
    }

    @GetMapping("/random/{howMany}")
    public List<Question> getRandomQuestions(@PathVariable int howMany){
        return questionService.getRandomQuestions(howMany);
    }

    @GetMapping("/category/{category}/{howMany}")
    public List<Question> getRandomQuestionsByCategory(@PathVariable int howMany, @PathVariable Category category){
        return questionService.getRandomQuestionsByCategory(howMany,category);
    }

    @GetMapping("/exam/{certType}")
    public List<Question> getQuestionsForPracticeExam(@PathVariable CertType certType){
        return questionService.generateExam(certType);
    }

}
