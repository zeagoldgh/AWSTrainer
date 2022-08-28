package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface QuestionRepo extends MongoRepository<Question,String>, ExtendQuestionRepo {

    Optional<Question> findByQuestion(String question);



}
