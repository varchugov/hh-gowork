package ru.gowork.service;

import ru.gowork.dao.UserDao;
import ru.gowork.entity.User;
import ru.gowork.exceptions.UserExistsException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class RegistrationService {
  private final PasswordEncoder passwordEncoder;
  private final UserDao dao;

  public RegistrationService(UserDao dao) {
    this.dao = dao;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  public void registerUser(String email, String password) throws UserExistsException {
    if (dao.getUserByEmail(email).isPresent()) {
      throw new UserExistsException();
    }
    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));
    dao.registerUser(user);
  }
}
