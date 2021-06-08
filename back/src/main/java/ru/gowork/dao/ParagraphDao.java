package ru.gowork.dao;

import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

import ru.gowork.entity.Paragraph;
import ru.gowork.entity.Step;
import ru.gowork.entity.User;

public class ParagraphDao {
    private final SessionFactory sessionFactory;

    public ParagraphDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public List<Paragraph> getParagraphs(Integer chapterId, User user) {
        return sessionFactory.getCurrentSession()
                .createQuery("SELECT DISTINCT paragraph FROM Paragraph paragraph JOIN FETCH " +
                        "paragraph.steps step LEFT JOIN FETCH step.userAnswer ans " +
                        "WHERE paragraph.chapterId = :id AND (ans.user = :user OR ans.user IS NULL)", Paragraph.class)
                .setParameter("id", chapterId)
                .setParameter("user", user)
                .list();
    }

    @Transactional
    public List<Paragraph> getParagraphsToCurrentStep(Integer chapterId, Integer currentStepId, User user) {
        return sessionFactory.getCurrentSession()
                .createQuery("SELECT DISTINCT paragraph FROM Paragraph paragraph JOIN FETCH " +
                        "paragraph.steps step LEFT JOIN FETCH step.userAnswer ans WHERE paragraph.chapterId = :id " +
                        "AND step.id <= :stepId AND (ans.user = :user OR ans.user IS NULL)", Paragraph.class)
                .setParameter("id", chapterId)
                .setParameter("stepId", currentStepId)
                .setParameter("user", user)
                .list();
    }

    @Transactional
    public Optional<Paragraph> getNextStep(Integer currentStepId) {
        return sessionFactory.getCurrentSession()
                .createQuery("SELECT DISTINCT paragraph FROM Paragraph paragraph JOIN FETCH " +
                        "paragraph.steps step WHERE " +
                        "step.id = :stepId", Paragraph.class)
                .setParameter("stepId", currentStepId + 1)
                .uniqueResultOptional();
    }

    @Transactional
    public Step getStep(Integer id) {
        return sessionFactory.getCurrentSession()
                .get(Step.class, id);
    }
}
