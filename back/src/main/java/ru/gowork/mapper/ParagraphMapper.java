package ru.gowork.mapper;

import ru.gowork.dto.ParagraphDto;
import ru.gowork.dto.StepDto;
import ru.gowork.dto.ShortParagraphDto;
import ru.gowork.dto.ExtendedParagraphDto;
import ru.gowork.dto.ExtendedStepDto;
import ru.gowork.entity.Paragraph;

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

    public static ShortParagraphDto fromEntityShort(Paragraph paragraph) {
        ShortParagraphDto dto = new ShortParagraphDto();
        dto.setId(paragraph.getId());
        dto.setName(paragraph.getName());
        return dto;
    }

    public static ExtendedParagraphDto fromEntityExtended(Paragraph paragraph) {
        ExtendedParagraphDto dto = new ExtendedParagraphDto();
        dto.setId(paragraph.getId());
        dto.setName(paragraph.getName());
        List<ExtendedStepDto> steps = paragraph.getSteps().stream()
                .map(StepMapper::fromEntityExtended)
                .collect(Collectors.toList());
        dto.setSteps(steps);
        return dto;
    }
}
