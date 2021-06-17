package ru.gowork.service;

import ru.gowork.dao.ParagraphDao;
import ru.gowork.dao.UserDao;
import ru.gowork.dto.ExtendedParagraphDto;
import ru.gowork.dto.ParagraphDto;
import ru.gowork.entity.Paragraph;
import ru.gowork.entity.User;
import ru.gowork.mapper.ParagraphMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ParagraphService {
    private final ParagraphDao dao;
    private final UserDao userDao;

    public ParagraphService(ParagraphDao dao, UserDao userDao) {
        this.dao = dao;
        this.userDao = userDao;
    }

    public List<ExtendedParagraphDto> getChapterParagraphs(Integer chapterId, Integer currentStepId, String userEmail) {
        User user = userDao.getUserByEmail(userEmail).orElseThrow(() -> new RuntimeException("user '" + userEmail + "' disappeared"));

        List<Paragraph> paragraphs;
        if (currentStepId != null) {
            paragraphs = dao.getParagraphsToCurrentStep(chapterId, currentStepId, user);
        } else {
            paragraphs = dao.getParagraphs(chapterId, user);
        }
        return paragraphs.stream()
            .map(ParagraphMapper::fromEntityExtended)
            .collect(Collectors.toList());
    }

    public ParagraphDto getNextStepInParagraph(Integer currentStepId, String userEmail) {
        Optional<Paragraph> paragraph = dao.getNextStep(currentStepId);
        User user = userDao.getUserByEmail(userEmail).orElseThrow(() -> new RuntimeException("user '" + userEmail + "' disappeared"));

        if (currentStepId.equals(user.getCurrentStep().getId()) && paragraph.isPresent()) {
            userDao.setUserCurrentStep(userEmail, currentStepId + 1);
        }
        return paragraph.map(ParagraphMapper::fromEntity).orElse(null);
    }
}
