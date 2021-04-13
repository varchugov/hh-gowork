package ru.gowork.mapper;

import ru.gowork.entity.Step;
import ru.gowork.dto.StepDto;

public class StepMapper {

    public static StepDto fromEntity(Step step) {
        StepDto dto = new StepDto();
        dto.setId(step.getId());
        dto.setTheory(step.getTheory());
        dto.setQuestion(step.getQuestion());
        return dto;
    }
}
