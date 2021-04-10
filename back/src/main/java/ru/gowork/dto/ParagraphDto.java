package ru.gowork.dto;

import java.util.List;
import java.util.ArrayList;

public class ParagraphDto {
    private Integer id;

    private String name;

    private List<StepDto> steps = new ArrayList<>();

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

    public List<StepDto> getSteps() {
        return steps;
    }

    public void setSteps(List<StepDto> steps) {
        this.steps = steps;
    }

}
