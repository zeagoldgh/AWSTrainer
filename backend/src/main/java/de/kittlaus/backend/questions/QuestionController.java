package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<Question> postNewQuestion(@RequestBody Question newQuestion){
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveNewQuestion(newQuestion));
    }

}
