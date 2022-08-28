package de.kittlaus.backend.answers;

import de.kittlaus.backend.models.answers.CheckedAnswer;
import de.kittlaus.backend.models.answers.GivenAnswer;
import de.kittlaus.backend.models.answers.ValidatedAnswer;
import de.kittlaus.backend.models.questions.Question;
import de.kittlaus.backend.questions.QuestionService;
import de.kittlaus.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepo answerRepo;
    private final QuestionService questionService;
    private final UserService userService;


    public Optional<ValidatedAnswer> checkAndSaveAnswers(List<GivenAnswer> given, String username) {
        String userId = userService.findByUsername(username).orElseThrow().getId();
        List<String> questionsId = given.stream().map(answer -> answer.getQuestionId()).toList();
        List<Question> questions = questionService.findAllById(questionsId);
        List<CheckedAnswer> checkedAnswers = new ArrayList<>();
        for (int i = 0; i < questions.size(); i++) {
            checkedAnswers.add(validateAnswer(given.get(i),questions.get(i)));
        }
        ValidatedAnswer validatedAnswer = ValidatedAnswer.builder().validatedAnswers(checkedAnswers).userId(userId).isExam(false).build();
        return Optional.of(answerRepo.save(validatedAnswer));
    }

    private CheckedAnswer validateAnswer(GivenAnswer answer, Question question){
        CheckedAnswer checked = CheckedAnswer.builder().givenAnswers(answer.getGivenAnswers()).possibleAnswers(question.getAnswers()).build();
        List<Boolean> answeredCorrect = new ArrayList<>();
        for (int i = 0; i < question.getRightAnswers().size(); i++) {
            answeredCorrect.add(i,answer.getGivenAnswers().get(i).equals(question.getRightAnswers().get(i)));
        }
        checked.setCorrectlyAnswers(answeredCorrect);
        return checked;
    }
}