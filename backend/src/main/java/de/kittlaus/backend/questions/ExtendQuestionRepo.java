package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import de.kittlaus.backend.models.questions.Question;

import java.util.List;

public interface ExtendQuestionRepo {

    List<Question> findRandomQuestions(int count);

    List<Question> findRandomQuestionsInCategory(int count, Category category);

    List<Question> findRandomQuestionsInCategoryInExam(int count, Category category, CertType certType);

}
