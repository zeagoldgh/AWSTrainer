package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
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

    @Override
    public List<Question> findRandomTasksInCategory(int count, Category category) {
        var aggregation = Aggregation.newAggregation(
                Question.class,
                Aggregation.match(Criteria.where("{ category : "+category+" }")),
                Aggregation.sample(count)
        );
        var aggregationResult = mongoTemplate.aggregate(aggregation, Question.class);
        return aggregationResult.getMappedResults();
    }
}
