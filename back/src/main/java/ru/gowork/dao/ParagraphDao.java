package ru.gowork.dao;

import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

import ru.gowork.entity.Paragraph;
import ru.gowork.entity.Step;

public class ParagraphDao {
    private final SessionFactory sessionFactory;

    public ParagraphDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public List<Paragraph> getParagraphs(Integer chapterId) {
        return sessionFactory.getCurrentSession()
                .createQuery("SELECT DISTINCT paragraph FROM Paragraph paragraph JOIN FETCH " +
                        "paragraph.steps WHERE paragraph.chapterId = :id")
                .setParameter("id", chapterId)
                .list();
    }

    @Transactional
    public List<Paragraph> getParagraphsToCurrentStep(Integer chapterId, Integer currentStepId) {
        return sessionFactory.getCurrentSession()
                .createQuery("SELECT DISTINCT paragraph FROM Paragraph paragraph JOIN FETCH " +
                        "paragraph.steps step WHERE paragraph.chapterId = :id AND step.id <= :stepId")
                .setParameter("id", chapterId)
                .setParameter("stepId", currentStepId)
                .list();
    }

    @Transactional
    public Optional<Paragraph> getNextStep(Integer currentParagraphId, Integer currentStepId) {
        return sessionFactory.getCurrentSession()
                .createQuery("SELECT DISTINCT paragraph FROM Paragraph paragraph JOIN FETCH " +
                        "paragraph.steps step WHERE (paragraph.id = :id  OR paragraph.id = :nextId) " +
                        "AND step.id = :stepId", Paragraph.class)
                .setParameter("id", currentParagraphId)
                .setParameter("nextId", currentParagraphId + 1)
                .setParameter("stepId", currentStepId + 1)
                .uniqueResultOptional();
    }

    @Transactional
    public Step getStep(Integer id) {
        return sessionFactory.getCurrentSession()
                .get(Step.class, id);
    }
}
