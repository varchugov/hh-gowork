package ru.gowork.service;

import ru.gowork.dao.UserAnswerDao;
import ru.gowork.dao.UserDao;
import ru.gowork.entity.User;
import ru.gowork.entity.UserAnswer;

import javax.inject.Singleton;
import java.util.Optional;

@Singleton
public class AnswerService {
    private final UserAnswerDao userAnswerDao;
    private final UserDao userDao;

    public AnswerService(UserAnswerDao userAnswerDao, UserDao userDao) {
        this.userAnswerDao = userAnswerDao;
        this.userDao = userDao;
    }

    public Optional<Object> saveAnswerGetExplanation(String userEmail, String answer) {
        Optional<User> userOpt = userDao.getUserByEmail(userEmail);
        userOpt.ifPresent(user -> userAnswerDao.saveAnswer(new UserAnswer(user, user.getCurrentStep(), answer)));
        return userOpt.map(user -> user.getCurrentStep().getAnswersExplanations());
        }
}
