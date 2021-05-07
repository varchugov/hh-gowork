package ru.gowork;

import ru.hh.nab.starter.NabApplication;
import ru.gowork.config.ProdConfig;
import ru.gowork.config.AuthFeature;

import org.glassfish.jersey.server.ResourceConfig;

public class App {

  public static void main(String[] args) {
    // System.setProperty(PropertiesUtils.SETINGS_DIR_PROPERTY, "back/src/etc");
    NabApplication
            .builder()
            .configureJersey().addAllowedPackages("ru.gowork")
            .executeOnConfig(App::registerJerseyFilters).bindToRoot()
            .build()
            .run(ProdConfig.class);
  }

  private static void registerJerseyFilters(ResourceConfig config) {
    config.register(AuthFeature.class);
  }
}
