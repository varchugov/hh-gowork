package ru.gowork.config;

import ru.gowork.resource.ExampleResource;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.hh.nab.starter.NabProdConfig;

@Configuration
@Import({
  ExampleResource.class,
  NabProdConfig.class
})
public class ProdConfig {

}
