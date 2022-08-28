package de.kittlaus.backend.questions;


import de.kittlaus.backend.models.questions.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    public List<Question> getRandomQuestions(int howMany) {
        return questionRepo.findRandomTasks(howMany);

    }


    public List<Question> findAllById(List<String> questionsId) {
        return (List<Question>) questionRepo.findAllById(questionsId);
    }
}
