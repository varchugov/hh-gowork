package ru.gowork.dao;

import org.hibernate.SessionFactory;
import org.hibernate.transform.DistinctRootEntityResultTransformer;
import org.springframework.transaction.annotation.Transactional;
import ru.gowork.entity.Paragraph;
import ru.gowork.entity.Step;
import ru.gowork.entity.User;

import java.util.List;
import java.util.Optional;

public class ParagraphDao {
    private final SessionFactory sessionFactory;

    public ParagraphDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public List<Paragraph> getParagraphs(Integer chapterId, User user) {
        return sessionFactory.getCurrentSession()
            .createNativeQuery("SELECT {p.*}, {s.*}, {ua.*} FROM paragraphs p JOIN " +
                "steps s ON s.paragraph_id = p.id LEFT JOIN users_answers ua ON ua.step_id = s.id " +
                "AND ua.user_id = :user " +
                "WHERE p.chapter_id = :id ORDER BY s.id ASC")
            .setParameter("id", chapterId)
            .setParameter("user", user.getId())
            .addEntity("p", Paragraph.class)
            .addJoin("s", "p.steps")
            .addJoin("ua", "s.userAnswers")
            .addEntity("p", Paragraph.class)  // duplicate Entity so that it is last in order and root
            .setResultTransformer(DistinctRootEntityResultTransformer.INSTANCE)
            .list();
    }

    @Transactional
    public List<Paragraph> getParagraphsToCurrentStep(Integer chapterId, Integer currentStepId, User user) {
        return sessionFactory.getCurrentSession()
            .createNativeQuery("SELECT {p.*}, {s.*}, {ua.*} FROM paragraphs p JOIN " +
                "steps s ON s.paragraph_id = p.id LEFT JOIN users_answers ua ON ua.step_id = s.id " +
                "AND ua.user_id = :user " +
                "WHERE p.chapter_id = :id AND s.id <= :stepId ORDER BY s.id ASC")
            .setParameter("id", chapterId)
            .setParameter("stepId", currentStepId)
            .setParameter("user", user.getId())
            .addEntity("p", Paragraph.class)
            .addJoin("s", "p.steps")
            .addJoin("ua", "s.userAnswers")
            .addEntity("p", Paragraph.class)  // duplicate Entity so that it is last in order and root
            .setResultTransformer(DistinctRootEntityResultTransformer.INSTANCE)
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
