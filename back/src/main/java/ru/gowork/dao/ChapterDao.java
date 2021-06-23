package ru.gowork.dao;

import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;
import ru.gowork.entity.Chapter;

import java.util.List;

public class ChapterDao {
    private final SessionFactory sessionFactory;

    public ChapterDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public List<Chapter> getContent() {
        return sessionFactory.getCurrentSession()
                .createQuery(" SELECT DISTINCT chapter FROM Chapter chapter JOIN FETCH " +
                        "chapter.paragraphs paragraphs ORDER BY chapter.id")
                .list();
    }

    @Transactional
    public Integer getTotalSteps() {
        return sessionFactory.getCurrentSession()
            .createQuery("SELECT count(*) from Step", Long.class)
            .getSingleResult().intValue();
    }
}
