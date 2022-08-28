package de.kittlaus.backend.answers;

import de.kittlaus.backend.models.answers.GivenAnswer;
import de.kittlaus.backend.models.answers.ValidatedAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/answer")
public class AnswerController {

    private final AnswerService answerService;


    @PostMapping
    public ResponseEntity<ValidatedAnswer> checkAnswers(@RequestBody List<GivenAnswer> given, Principal principal){
        return ResponseEntity.of(answerService.checkAndSaveAnswers(given, principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ValidatedAnswer> getAnswerById(@RequestParam String id){
        return ResponseEntity.of(answerService.findById(id));
    }


}
