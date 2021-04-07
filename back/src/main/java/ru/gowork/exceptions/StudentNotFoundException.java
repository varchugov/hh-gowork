package ru.gowork.exceptions;

public class StudentNotFoundException extends Exception {
    public StudentNotFoundException() {
        super("student was not found");
    }
}
