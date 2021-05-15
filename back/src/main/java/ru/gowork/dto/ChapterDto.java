package ru.gowork.dto;

import java.util.List;

public class ChapterDto {

    private Integer id;
    private String name;
    private List<ShortParagraphDto> paragraphs;

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

}
