package ru.gowork.dto;

import java.util.List;

public class ExtendedStepDto {
    private Integer id;

    private String theory;

    private Object question;

    private Object userAnswer;

    private List<Integer> correctAnswers;

    private Object answersExplanations;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTheory() {
        return theory;
    }

    public void setTheory(String theory) {
        this.theory = theory;
    }

    public Object getQuestion() {
        return question;
    }

    public void setQuestion(Object question) {
        this.question = question;
    }

    public Object getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(Object userAnswer) {
        this.userAnswer = userAnswer;
    }

    public List<Integer> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<Integer> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Object getAnswersExplanations() {
        return answersExplanations;
    }

    public void setAnswersExplanations(Object answersExplanations) {
        this.answersExplanations = answersExplanations;
    }
}
