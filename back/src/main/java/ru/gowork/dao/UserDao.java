package ru.gowork.dao;

import org.hibernate.SessionFactory;
import ru.gowork.entity.User;

import javax.transaction.Transactional;
import java.util.Optional;

public class UserDao {
  private final SessionFactory sessionFactory;

  public UserDao(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Transactional
  public Optional<User> getUserByEmail(String email) {
    return sessionFactory.getCurrentSession()
        .createQuery("FROM User user WHERE user.email = :email")
        .setParameter("email", email)
        .uniqueResultOptional();
  }

  @Transactional
  public void registerUser(User user) {
    sessionFactory.getCurrentSession().save(user);
  }

}
