package ru.gowork.service;

import ru.gowork.dao.ChapterDao;
import ru.gowork.dto.ChapterDto;
import ru.gowork.entity.Chapter;
import ru.gowork.mapper.ChapterMapper;

import javax.inject.Singleton;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class ChapterService {
    private final ChapterDao dao;
    private final ChapterMapper mapper;

    public ChapterService(ChapterDao dao, ChapterMapper mapper) {
        this.dao = dao;
        this.mapper = mapper;
    }

    public List<ChapterDto> getContent() {
        List<Chapter> chapters = dao.getContent();
        return chapters.stream()
                .map(chapter -> ChapterMapper.fromEntity(chapter))
                .collect(Collectors.toList());
    }
}
