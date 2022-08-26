package de.kittlaus.backend.questions;


import de.kittlaus.backend.models.questions.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepo questionRepo;

    public Question saveNewQuestion(Question newQuestion) throws IllegalArgumentException {
        if (questionRepo.findByQuestion(newQuestion.getQuestion()).isPresent()){
            throw new IllegalArgumentException("Frage existiert schon");
        }
        return questionRepo.save(newQuestion);
    }
}
