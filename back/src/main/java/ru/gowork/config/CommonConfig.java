package ru.gowork.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.gowork.dao.ChapterDao;
import ru.gowork.dao.ParagraphDao;
import ru.gowork.dao.StudentsDao;
import ru.gowork.dao.UserAnswerDao;
import ru.gowork.dao.UserDao;
import ru.gowork.entity.UserAnswer;
import ru.gowork.mapper.ChapterMapper;
import ru.gowork.mapper.StudentMapper;
import ru.gowork.resource.AnswerResource;
import ru.gowork.resource.AuthResource;
import ru.gowork.resource.ChapterResource;
import ru.gowork.resource.ParagraphResource;
import ru.gowork.resource.StudentResource;
import ru.gowork.resource.HHAuthResource;
import ru.gowork.service.AnswerService;
import ru.gowork.service.AuthService;
import ru.gowork.service.ChapterService;
import ru.gowork.service.ParagraphService;
import ru.gowork.service.StudentsService;
import ru.hh.nab.common.properties.FileSettings;
import ru.hh.nab.datasource.DataSourceFactory;
import ru.hh.nab.hibernate.MappingConfig;
import ru.hh.nab.starter.NabCommonConfig;

import javax.sql.DataSource;


@Configuration
@Import({
  StudentResource.class,
  StudentsDao.class,
  StudentMapper.class,
  StudentsService.class,
  ParagraphResource.class,
  ParagraphDao.class,
  ParagraphService.class,
  UserDao.class,
  AuthResource.class,
  GwResourceConfig.class,
  AuthService.class,
  ChapterDao.class,
  ChapterResource.class,
  ChapterService.class,
  ChapterMapper.class,
  AnswerResource.class,
  AnswerService.class,
  UserAnswer.class,
  UserAnswerDao.class,
  HHAuthResource.class,
  NabCommonConfig.class
})
public class CommonConfig {
    @Bean
    public MappingConfig mappingConfig() {
        MappingConfig mappingConfig = new MappingConfig();
        mappingConfig.addPackagesToScan("ru.gowork.entity");
        return mappingConfig;
    }

    @Bean
    public DataSource dataSource(DataSourceFactory dataSourceFactory, FileSettings fileSettings) {
        return dataSourceFactory.create("master", false, fileSettings);
    }
}
