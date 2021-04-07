package ru.gowork.config;

import ru.gowork.resource.StudentResource;
import ru.gowork.dao.StudentsDao;
import ru.gowork.mapper.StudentMapper;
import ru.gowork.service.StudentsService;

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
  StudentResource.class,
  StudentsDao.class,
  StudentMapper.class,
  StudentsService.class,
  NabProdConfig.class,
  NabHibernateProdConfig.class
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
