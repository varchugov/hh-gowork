package ru.gowork.service;

import ru.gowork.dao.ParagraphDao;
import ru.gowork.mapper.ParagraphMapper;
import ru.gowork.dto.ParagraphDto;
import ru.gowork.entity.Paragraph;
import java.util.List;
import java.util.stream.Collectors;

public class ParagraphService {
    private final ParagraphDao dao;

    public ParagraphService(ParagraphDao dao) {
        this.dao = dao;
    }

    public List<ParagraphDto> getChapterParagraphs(Integer chapterId, Integer currentStepId) {
        List<Paragraph> paragraphs;
        if (currentStepId != null) {
            paragraphs = dao.getParagraphsToCurrentStep(chapterId, currentStepId);
        } else {
            paragraphs = dao.getParagraphs(chapterId);
        }
        return paragraphs.stream()
                .map(paragraph -> ParagraphMapper.fromEntity(paragraph))
                .collect(Collectors.toList());
    }
}
