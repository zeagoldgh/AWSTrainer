package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ExtendQuestionRepoImpl implements ExtendQuestionRepo {

    private final MongoTemplate mongoTemplate;

    @Override
    public List<Question> findRandomTasks(int count) {
        var aggregation = Aggregation.newAggregation(
                Question.class,
                aggregationOperationContext -> aggregationOperationContext.getMappedObject(org.bson.Document.parse("{ $sample: { size: " + count + " } }"))
        );
        var aggregationResult = mongoTemplate.aggregate(aggregation, Question.class);
        return aggregationResult.getMappedResults();
    }
}
