package ru.gowork.mapper;

import ru.gowork.dto.ChapterDto;
import ru.gowork.dto.ShortParagraphDto;
import ru.gowork.entity.Chapter;
import ru.gowork.entity.Step;

import java.util.List;
import java.util.stream.Collectors;

public class ChapterMapper {

    public static ChapterDto fromEntity(Chapter chapter, Step currentStep) {
        ChapterDto dto = new ChapterDto();
        dto.setId(chapter.getId());
        dto.setName(chapter.getName());
        List<ShortParagraphDto> paragraphs = chapter.getParagraphs().stream()
                .map(ParagraphMapper::fromEntityShort)
                .collect(Collectors.toList());
        dto.setParagraphs(paragraphs);

        if (chapter.getId().equals(currentStep.getParagraph().getChapterId())) {
            dto.setCurrent(true);
            dto.setCurrentStep(currentStep.getId());
            dto.setCurrentParagraph(currentStep.getParagraph().getId());
        }
        return dto;
    }
}
