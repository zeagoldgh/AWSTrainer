package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Question;

import java.util.List;

public interface ExtendQuestionRepo {

    List<Question> findRandomTasks(int count);

}
