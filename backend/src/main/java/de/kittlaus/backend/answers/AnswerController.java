package de.kittlaus.backend.answers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/answer")
public class AnswerController {

    private final AnswerService answerService;


}
