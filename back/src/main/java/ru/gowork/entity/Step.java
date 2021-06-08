package ru.gowork.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.TypeDefs;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.Type;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.util.List;

@Entity
@Table(name = "steps")
@TypeDefs({
        @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
})
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String theory;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Object question;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb", name = "correct_answers")
    private List<Integer> correctAnswers;

    @Column(name = "has_answer")
    private Boolean hasAnswer;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb", name = "answers_explanations")
    private Object answersExplanations;

    @ManyToOne
    @JoinColumn(name = "paragraph_id")
    private Paragraph paragraph;

    @OneToOne(mappedBy = "step", fetch = FetchType.LAZY)
    private UserAnswer userAnswer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTheory() {
        return theory;
    }

    public Object getQuestion() {
        return question;
    }

    public List<Integer> getCorrectAnswers() {
        return correctAnswers;
    }

    public Boolean getHasAnswer() {
        return hasAnswer;
    }

    public Object getAnswersExplanations() {
        return answersExplanations;
    }

    public Paragraph getParagraph() {
        return paragraph;
    }

    public void setParagraph(Paragraph paragraph) {
        this.paragraph = paragraph;
    }

    public UserAnswer getUserAnswer() {
        return userAnswer;
    }
}
