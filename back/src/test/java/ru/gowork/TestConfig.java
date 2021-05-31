package ru.gowork;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.gowork.config.CommonConfig;
import ru.hh.nab.hibernate.NabHibernateCommonConfig;
import ru.hh.nab.testbase.NabTestConfig;
import ru.hh.nab.testbase.hibernate.NabHibernateTestBaseConfig;

@Configuration
@Import({
    NabTestConfig.class,
    NabHibernateCommonConfig.class,
    NabHibernateTestBaseConfig.class,
    CommonConfig.class
})
public class TestConfig {
  
}
