package de.kittlaus.backend.models.answers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ValidatedAnswer {

    @Id
    private String id;

    private String userId;
    private boolean isExam;
    List<CheckedAnswer> validatedAnswers;

}
