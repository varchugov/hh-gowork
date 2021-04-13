package ru.gowork.dto;

import java.util.List;

public class CheckAnswerDto {

    private Boolean isCorrect;

    private List<Integer> correctAnswers;

    private Object answersExplanations;

    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
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
