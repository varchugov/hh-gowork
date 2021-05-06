package ru.gowork.config;

import ru.gowork.dao.UserDao;
import ru.gowork.resource.RegistrationResource;
import ru.gowork.resource.StudentResource;
import ru.gowork.resource.ParagraphResource;
import ru.gowork.dao.StudentsDao;
import ru.gowork.dao.ParagraphDao;
import ru.gowork.mapper.StudentMapper;
import ru.gowork.service.RegistrationService;
import ru.gowork.service.StudentsService;
import ru.gowork.service.ParagraphService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.hh.nab.starter.NabProdConfig;
import ru.hh.nab.datasource.DataSourceFactory;
import ru.hh.nab.common.properties.FileSettings;
import ru.hh.nab.hibernate.NabHibernateProdConfig;
import ru.hh.nab.hibernate.MappingConfig;

import javax.sql.DataSource;

@Configuration
@Import({
  RegistrationResource.class,
  UserDao.class,
  RegistrationService.class,
  StudentResource.class,
  StudentsDao.class,
  StudentMapper.class,
  StudentsService.class,
  NabProdConfig.class,
  NabHibernateProdConfig.class,
  ParagraphResource.class,
  ParagraphDao.class,
  ParagraphService.class
})
public class ProdConfig {
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
