package de.kittlaus.backend.models.questions;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum CertType {
    CLF_C01 ("CLF-C01");

    private String exam;

    CertType(String exam) {
        this.exam = exam;
    }

    public String getCertType() {
        return this.exam;
    }

    @JsonCreator
    public static CertType getCertTypeFromExam(String value) {
        for (CertType dep : CertType.values()) {
            if (dep.getCertType().equals(value)) {
                return dep;
            }
        }
        return null;
    }

}
