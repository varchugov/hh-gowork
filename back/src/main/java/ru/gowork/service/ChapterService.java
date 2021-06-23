package ru.gowork.service;

import ru.gowork.dao.ChapterDao;
import ru.gowork.dao.UserDao;
import ru.gowork.dto.ChapterDto;
import ru.gowork.entity.Chapter;
import ru.gowork.entity.Step;
import ru.gowork.entity.User;
import ru.gowork.mapper.ChapterMapper;

import javax.inject.Singleton;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class ChapterService {
    private final ChapterDao dao;
    private final UserDao userDao;

    public ChapterService(ChapterDao dao, UserDao userDao) {
        this.dao = dao;
        this.userDao = userDao;
    }

    public List<ChapterDto> getContent(String userEmail) {
        List<Chapter> chapters = dao.getContent();
        Integer totalSteps = dao.getTotalSteps();
        User user = userDao.getUserByEmail(userEmail).orElseThrow(() -> new RuntimeException("user '" + userEmail + "' disappeared"));
        Step currentStep = user.getCurrentStep();
        return chapters.stream()
                .map(chapter -> ChapterMapper.fromEntity(chapter, currentStep, totalSteps))
                .collect(Collectors.toList());
    }
}
