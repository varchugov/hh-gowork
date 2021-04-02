package ru.gowork.service;

import javax.inject.Singleton;

import ru.gowork.dao.StudentsDao;
import ru.gowork.mapper.StudentMapper;
import ru.gowork.dto.StudentDto;
import ru.gowork.entity.Student;
import ru.gowork.exceptions.StudentNotFoundException;

@Singleton
public class StudentsService {
    private final StudentsDao dao;
    private final StudentMapper mapper;

    public StudentsService(StudentsDao dao, StudentMapper mapper) {
        this.dao = dao;
        this.mapper = mapper;
    }

    public StudentDto createStudent(String username) {
        Student entity = new Student();
        entity.setUsername(username);
        Student createdEntity = dao.createStudent(entity);
        return mapper.fromEntity(createdEntity);
    }

    public StudentDto getStudentById(Integer id) throws StudentNotFoundException {
        Student entity = dao.getStudent(id);
        if (entity == null) {
            throw new StudentNotFoundException();
        }
        return mapper.fromEntity(entity);
    }
}
