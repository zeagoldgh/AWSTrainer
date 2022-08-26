package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepo extends MongoRepository<Question,String> {

}
