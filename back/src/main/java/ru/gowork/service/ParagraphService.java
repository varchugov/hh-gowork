package ru.gowork.service;

import ru.gowork.dao.ParagraphDao;
import ru.gowork.mapper.ParagraphMapper;
import ru.gowork.dto.ParagraphDto;
import ru.gowork.dto.CheckAnswerDto;
import ru.gowork.entity.Paragraph;
import ru.gowork.entity.Step;
import java.util.List;
import java.util.Optional;
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

    public ParagraphDto getNextStepInParagraph(Integer currentParagraphId, Integer currentStepId) {
        Optional<Paragraph> paragraph = dao.getNextStep(currentParagraphId, currentStepId);
        return paragraph.map(ParagraphMapper::fromEntity).orElse(null);
    }

    public CheckAnswerDto checkStepAnswer(Integer stepId, List<Integer> userAnswers) {
        Step step = dao.getStep(stepId);
        Boolean isCorrect = step.getCorrectAnswers().equals(userAnswers);
        CheckAnswerDto checkAnswerDto = new CheckAnswerDto();
        checkAnswerDto.setCorrectAnswers(step.getCorrectAnswers());
        checkAnswerDto.setAnswersExplanations(step.getAnswersExplanations());
        checkAnswerDto.setCorrect(isCorrect);
        return checkAnswerDto;
    }
}
