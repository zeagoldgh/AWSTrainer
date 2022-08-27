package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Question;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface QuestionRepo extends MongoRepository<Question,String> {

    Optional<Question> findByQuestion(String question);



}
