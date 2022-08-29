package de.kittlaus.backend.models.answers;

import de.kittlaus.backend.models.questions.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnsweredQuestion {

    private Question question;
    private List<Boolean> givenAnswers;
    private List<Boolean> correctlyAnswers;


}
