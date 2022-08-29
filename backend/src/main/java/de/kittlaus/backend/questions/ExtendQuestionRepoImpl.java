package de.kittlaus.backend.questions;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
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
    public List<Question> findRandomQuestions(int count) {
        var aggregation = Aggregation.newAggregation(
                Question.class,
                aggregationOperationContext -> aggregationOperationContext.getMappedObject(org.bson.Document.parse("{ $sample: { size: " + count + " } }"))
        );
        var aggregationResult = mongoTemplate.aggregate(aggregation, Question.class);
        return aggregationResult.getMappedResults();
    }

    @Override
    public List<Question> findRandomQuestionsInCategory(int count, Category category) {
        var aggregation = Aggregation.newAggregation(
                Question.class,
                Aggregation.match(Criteria.where("category").is(category)),
                Aggregation.sample(count)
        );
        var aggregationResult = mongoTemplate.aggregate(aggregation, Question.class);
        return aggregationResult.getMappedResults();
    }

    @Override
    public List<Question> findRandomQuestionsInCategoryInExam(int count, Category category, CertType certType) {
        var aggregation = Aggregation.newAggregation(
                Question.class,
                Aggregation.match(Criteria.where("category").is(category)),
                Aggregation.match(Criteria.where("certType").is(certType)),
                Aggregation.sample(count)
        );
        var aggregationResult = mongoTemplate.aggregate(aggregation, Question.class);
        return aggregationResult.getMappedResults();
    }
}
