package ru.gowork.dto;

import java.util.ArrayList;
import java.util.List;

public class ExtendedParagraphDto {

    private Integer id;

    private String name;

    private List<ExtendedStepDto> steps = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ExtendedStepDto> getSteps() {
        return steps;
    }

    public void setSteps(List<ExtendedStepDto> steps) {
        this.steps = steps;
    }
}
