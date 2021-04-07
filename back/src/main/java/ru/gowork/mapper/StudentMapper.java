package ru.gowork.mapper;

import ru.gowork.entity.Student;
import ru.gowork.dto.StudentDto;

public class StudentMapper {

    public StudentDto fromEntity(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setUsername(student.getUsername());
        return dto;
    }

    public Student toEntity(StudentDto student) {
        Student entity = new Student();
        entity.setUsername(student.getUsername());
        return entity;
    }
}
