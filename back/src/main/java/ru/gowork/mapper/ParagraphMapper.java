package ru.gowork.mapper;

import ru.gowork.entity.Paragraph;
import ru.gowork.dto.ParagraphDto;
import ru.gowork.dto.StepDto;

import java.util.stream.Collectors;
import java.util.List;

public class ParagraphMapper {

    public static ParagraphDto fromEntity(Paragraph paragraph) {
        ParagraphDto dto = new ParagraphDto();
        dto.setId(paragraph.getId());
        dto.setName(paragraph.getName());
        List<StepDto> steps = paragraph.getSteps().stream()
                .map(StepMapper::fromEntity)
                .collect(Collectors.toList());
        dto.setSteps(steps);
        return dto;
    }
}
