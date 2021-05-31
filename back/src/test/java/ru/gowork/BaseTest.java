package ru.gowork;

import org.hibernate.SessionFactory;
import ru.hh.nab.hibernate.transaction.TransactionalScope;
import ru.hh.nab.starter.NabApplication;
import ru.hh.nab.testbase.NabTestBase;

import javax.inject.Inject;

public abstract class BaseTest extends NabTestBase {

  @Inject
  protected SessionFactory sessionFactory;

  @Inject
  protected TransactionalScope transactionalScope;

  @Override
  protected NabApplication getApplication() {
    return NabApplication.builder()
        .configureJersey().addAllowedPackages("ru.gowork")
        .bindToRoot()
        .build();
  }
}
