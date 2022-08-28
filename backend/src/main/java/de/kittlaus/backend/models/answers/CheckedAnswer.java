package de.kittlaus.backend.models.answers;

import de.kittlaus.backend.models.questions.Category;
import de.kittlaus.backend.models.questions.CertType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckedAnswer {

    private List<String> possibleAnswers;
    private List<Boolean> givenAnswers;
    private List<Boolean> correctlyAnswers;
    private Category category;
    private CertType certType;


}
