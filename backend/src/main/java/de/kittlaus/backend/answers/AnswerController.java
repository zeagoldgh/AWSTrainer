package de.kittlaus.backend.answers;

import de.kittlaus.backend.models.answers.AnswersDTO;
import de.kittlaus.backend.models.answers.AnswersValidatedDTO;
import de.kittlaus.backend.models.answers.GivenAnswer;
import de.kittlaus.backend.models.answers.ValidatedAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<AnswersValidatedDTO> checkAnswers(@RequestBody List<GivenAnswer> given, Principal principal){
        return ResponseEntity.status(HttpStatus.OK).body(answerService.checkAndSaveAnswers(given, principal.getName(),false));
    }

    @PostMapping("/exam")
    public ResponseEntity<AnswersValidatedDTO> checkExam(@RequestBody List<GivenAnswer> given, Principal principal){
        return ResponseEntity.status(HttpStatus.OK).body(answerService.checkAndSaveAnswers(given, principal.getName(),true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnswersDTO> getAnswerById(@PathVariable String id){
        return ResponseEntity.of(answerService.findById(id));
    }


}
