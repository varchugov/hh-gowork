package ru.gowork.mapper;

import ru.gowork.dto.ExtendedStepDto;
import ru.gowork.entity.Step;
import ru.gowork.dto.StepDto;
import ru.gowork.entity.UserAnswer;

public class StepMapper {

    public static StepDto fromEntity(Step step) {
        StepDto dto = new StepDto();
        dto.setId(step.getId());
        dto.setTheory(step.getTheory());
        dto.setQuestion(step.getQuestion());
        return dto;
    }

    public static ExtendedStepDto fromEntityExtended(Step step) {
        ExtendedStepDto dto = new ExtendedStepDto();
        dto.setId(step.getId());
        dto.setTheory(step.getTheory());
        dto.setQuestion(step.getQuestion());
        dto.setCorrectAnswers(step.getCorrectAnswers());
        dto.setAnswersExplanations(step.getAnswersExplanations());
        if (step.getUserAnswers() != null && step.getUserAnswers().size() > 0) {
            dto.setUserAnswer(step.getUserAnswers().toArray(new UserAnswer[0])[0].getAnswer());
        }
        return dto;
    }
}
