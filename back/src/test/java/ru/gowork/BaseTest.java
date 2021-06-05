package ru.gowork;

import org.glassfish.jersey.server.ResourceConfig;
import org.hibernate.SessionFactory;
import ru.hh.nab.hibernate.transaction.TransactionalScope;
import ru.hh.nab.starter.NabApplication;
import ru.hh.nab.testbase.NabTestBase;

import javax.inject.Inject;

public abstract class BaseTest extends NabTestBase {

  protected static String FAKE_USER_EMAIL = "fake@example.com";

  @Inject
  protected SessionFactory sessionFactory;

  @Inject
  protected TransactionalScope transactionalScope;

  @Override
  protected NabApplication getApplication() {
    return NabApplication.builder()
        .configureJersey().addAllowedPackages("ru.gowork")
        .executeOnConfig(BaseTest::registerJerseyFilters).bindToRoot()
        .build();
  }

  private static void registerJerseyFilters(ResourceConfig config) {
    config.register(FakeAuthFeature.class);
  }
}
