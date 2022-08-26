package de.kittlaus.backend.models.questions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Question {

    @Id
    private String id;

    private String question;
    private String[] answers;
    private int[] indexRightAnswer;
    private Category category;
    private CertType certType;

}
