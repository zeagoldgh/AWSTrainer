package de.kittlaus.backend.answers;

import de.kittlaus.backend.models.answers.*;
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


    public AnswersValidatedDTO checkAndSaveAnswers(List<GivenAnswer> given, String username,boolean isExam) {
        String userId = userService.findByUsername(username).orElseThrow().getId();
        List<String> questionsId = given.stream().map(GivenAnswer::getQuestionId).toList();
        List<Question> questionsUnorderd = questionService.findAllById(questionsId);
        List<Question> questions = sortQuestions(questionsId, questionsUnorderd);
        List<CheckedAnswer> checkedAnswers = new ArrayList<>();
        for (int i = 0; i < questions.size(); i++) {
            checkedAnswers.add(validateAnswer(given.get(i), questions.get(i)));
        }
        ValidatedAnswer validatedAnswer = ValidatedAnswer.builder().validatedAnswers(checkedAnswers).userId(userId).isExam(isExam).build();
        return new AnswersValidatedDTO(answerRepo.save(validatedAnswer).getId());
    }


    public Optional<AnswersDTO> findById(String id) {
        Optional<ValidatedAnswer> optAnswers = answerRepo.findById(id);
        if (optAnswers.isEmpty()) {
            return Optional.empty();
        }
        ValidatedAnswer answers = optAnswers.get();
        List<String> questionIds = answers.getValidatedAnswers().stream().map(checkedAnswer -> checkedAnswer.getQuestionId()).toList();
        List<Question> questions = questionService.findAllById(questionIds);
        List<Question> questionsSorted = sortQuestions(questionIds, questions);
        List<AnsweredQuestion> answeredQuestions = makeAnsweredQuestions(answers, questionsSorted);
        return Optional.of(AnswersDTO.builder()
                .isExam(answers.isExam())
                .takenQuestions(answeredQuestions)
                .build());
    }

    private List<AnsweredQuestion> makeAnsweredQuestions(ValidatedAnswer answers, List<Question> questions) {
        List<AnsweredQuestion> combined = new ArrayList<>();
        for (int i = 0; i < questions.size(); i++) {
            combined.add(AnsweredQuestion.builder()
                    .question(questions.get(i))
                    .correctlyAnswers(answers.getValidatedAnswers().get(i).getCorrectlyAnswers())
                    .givenAnswers(answers.getValidatedAnswers().get(i).getGivenAnswers())
                    .build()
            );
        }
        return combined;
    }

    private CheckedAnswer validateAnswer(GivenAnswer answer, Question question) {
        CheckedAnswer checked = CheckedAnswer.builder()
                .givenAnswers(answer.getGivenAnswers())
                .questionId(question.getId())
                .category(question.getCategory())
                .certType(question.getCertType())
                .build();
        List<Boolean> answeredCorrect = new ArrayList<>();
        for (int i = 0; i < question.getRightAnswers().size(); i++) {
            answeredCorrect.add(i, answer.getGivenAnswers().get(i).equals(question.getRightAnswers().get(i)));
        }
        checked.setCorrectlyAnswers(answeredCorrect);
        return checked;
    }

    private List<Question> sortQuestions(List<String> questionsId, List<Question> questionsUnorderd) {
        List<Question> questions = new ArrayList<>(List.copyOf(questionsUnorderd));
        for (Question question : questionsUnorderd) {
            questions.set(questionsId.indexOf(question.getId()), question);
        }
        return questions;
    }

}
