package ru.gowork;

import ru.gowork.resource.ExampleResource;
import ru.hh.nab.common.properties.PropertiesUtils;
import ru.hh.nab.starter.NabApplication;
import ru.gowork.config.ProdConfig;

public class App {

  public static void main(String[] args) {
    // System.setProperty(PropertiesUtils.SETINGS_DIR_PROPERTY, "back/src/etc");
    NabApplication
            .builder()
            .configureJersey().addAllowedPackages("ru.gowork")
            .bindToRoot()
            .build()
            .run(ProdConfig.class);
  }
}
