package de.kittlaus.backend.models.answers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GivenAnswer {

    private String questionId;

    private List<Boolean> givenAnswers;

}
