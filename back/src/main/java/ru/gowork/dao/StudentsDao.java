package ru.gowork.dao;

import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;
import javax.inject.Singleton;

import ru.gowork.entity.Student;

@Singleton
public class StudentsDao {
    private final SessionFactory sessionFactory;

    public StudentsDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public Student createStudent(Student student) {
        sessionFactory.getCurrentSession().save(student);
        return student;
    }

    @Transactional
    public Student getStudent(Integer id) {
        return sessionFactory.getCurrentSession().get(Student.class, id);
    }
}
