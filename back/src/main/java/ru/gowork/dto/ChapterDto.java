package ru.gowork.dto;

import java.util.List;

public class ChapterDto {

    private Integer id;
    private String name;
    private List<ShortParagraphDto> paragraphs;
    private Boolean isCurrent;
    private Integer currentStep;
    private Integer currentParagraph;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public List<ShortParagraphDto> getParagraphs() {
        return paragraphs;
    }
    public void setParagraphs(List<ShortParagraphDto> paragraphs) {
        this.paragraphs = paragraphs;
    }

    public Boolean getCurrent() {
        return isCurrent;
    }

    public void setCurrent(Boolean current) {
        isCurrent = current;
    }

    public Integer getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(Integer currentStep) {
        this.currentStep = currentStep;
    }

    public Integer getCurrentParagraph() {
        return currentParagraph;
    }

    public void setCurrentParagraph(Integer currentParagraph) {
        this.currentParagraph = currentParagraph;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || id == null || getClass() != obj.getClass()) {
            return false;
        }
        ChapterDto other = (ChapterDto)obj;
        return id.equals(other.getId());
    }

    @Override
    public int hashCode() {
        if (id != null) {
            return id.hashCode();
        } else {
            return super.hashCode();
        }
    }

    @Override
    public String toString() {
        return getClass().getName() + "[id=" + id + "]";
    }
}
