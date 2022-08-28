package de.kittlaus.backend.answers;

import de.kittlaus.backend.models.answers.ValidatedAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnswerRepo  extends MongoRepository<ValidatedAnswer,String> {
}
