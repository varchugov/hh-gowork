package ru.gowork.dao;

import org.hibernate.SessionFactory;
import ru.gowork.entity.UserAnswer;

import javax.transaction.Transactional;

public class UserAnswerDao {
    private final SessionFactory sessionFactory;

    public UserAnswerDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    @Transactional
    public void saveAnswer(UserAnswer answer) {
        sessionFactory.getCurrentSession().save(answer);
    }
}
