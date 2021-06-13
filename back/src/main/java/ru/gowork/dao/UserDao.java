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

  @Transactional
  public Optional<User> getUserBySessionId(String sessionId) {
    return sessionFactory.getCurrentSession()
            .createQuery("FROM User user WHERE user.sessionToken = :sessionId")
            .setParameter("sessionId", sessionId)
            .uniqueResultOptional();
  }

  @Transactional
  public void setUserSession(String userEmail, String sessionId) {
    sessionFactory.getCurrentSession()
            .createSQLQuery("UPDATE users SET session_token = :sessionId WHERE email = :email")
            .setParameter("email", userEmail)
            .setParameter("sessionId", sessionId)
            .executeUpdate();
  }

  @Transactional
  public void setUserCurrentStep(String userEmail, Integer currentStepId) {
    sessionFactory.getCurrentSession()
            .createSQLQuery("UPDATE users SET current_user_step = :currentStepId WHERE email = :email")
            .setParameter("email", userEmail)
            .setParameter("currentStepId", currentStepId)
            .executeUpdate();
  }

  @Transactional
  public void upsertOAuthUser(String userEmail, String sessionId) {
    sessionFactory.getCurrentSession()
            .createSQLQuery("INSERT INTO users (email, password_hash, current_user_step, session_token, is_oauth) " +
                    "VALUES (:email, '', 1, :sessionId, TRUE) ON CONFLICT (email) DO UPDATE SET " +
                    "password_hash = excluded.password_hash, session_token = excluded.session_token, is_oauth = TRUE")
            .setParameter("email", userEmail)
            .setParameter("sessionId", sessionId)
            .executeUpdate();
  }

}
