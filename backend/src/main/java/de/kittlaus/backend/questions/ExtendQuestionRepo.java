package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import de.kittlaus.backend.models.questions.Question;

import java.util.List;

public interface ExtendQuestionRepo {

    List<Question> findRandomTasks(int count);

    List<Question> findRandomTasksInCategory(int count, Category category);

    List<Question> findRandomTasksInCategoryInExam(int count, Category category, CertType certType);

}
