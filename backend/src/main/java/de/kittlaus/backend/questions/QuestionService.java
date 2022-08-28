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
        List<Question> all = questionRepo.findAll();
        return randomizer(all,howMany);

    }

    private List<Question> randomizer(List<Question> allQuestions, int howMany){
        List<Question> random = new ArrayList<>();
        while (random.size()<howMany){
            Question question = allQuestions.get((int) (Math.random() * allQuestions.size()));
            if (!random.contains(question)){
                random.add(question);
            }
        }
        return random;
    }

    public List<Question> findAllById(List<String> questionsId) {
        return (List<Question>) questionRepo.findAllById(questionsId);
    }
}
