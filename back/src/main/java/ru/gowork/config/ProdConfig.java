package ru.gowork.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.hh.nab.hibernate.NabHibernateProdConfig;
import ru.hh.nab.starter.NabProdConfig;

@Configuration
@Import({
  NabHibernateProdConfig.class,
  NabProdConfig.class,
  CommonConfig.class
})
public class ProdConfig {

}
