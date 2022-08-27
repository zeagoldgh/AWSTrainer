package de.kittlaus.backend.models.questions;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum Category {
    CLOUD ("CLOUD"),
    SECURITY ("SECURITY"),
    BILLING ("BILLING"),
    TECHNOLOGY ("TECHNOLOGY");

    private String category;

    Category(String category) {
        this.category = category;
    }

    public String getCategory() {
        return this.category;
    }

    @JsonCreator
    public static Category getDepartmentFromCode(String value) {
        for (Category dep : Category.values()) {
            if (dep.getCategory().equals(value)) {
                return dep;
            }
        }
        return null;
    }

}
