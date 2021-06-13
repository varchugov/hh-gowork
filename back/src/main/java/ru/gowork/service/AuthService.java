package ru.gowork.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import ru.gowork.entity.Step;
import ru.gowork.entity.User;
import ru.gowork.dao.UserDao;

import ru.gowork.exceptions.LoginException;
import ru.gowork.exceptions.UserExistsException;

public class AuthService {
    private final PasswordEncoder passwordEncoder;

    private final UserDao userDao;

    public AuthService(UserDao userDao) {
        this.userDao = userDao;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public void registerUser(String email, String password) throws UserExistsException {
        if (userDao.getUserByEmail(email).isPresent()) {
            throw new UserExistsException();
        }
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        Step firstStep = new Step();
        firstStep.setId(1);
        user.setCurrentStep(firstStep);
        userDao.registerUser(user);
    }

    public void login(String email, String password, String sessionId) throws LoginException {
        User user = userDao.getUserByEmail(email)
                .filter(dbUser -> !dbUser.getOauth())
                .filter(dbUser -> passwordEncoder.matches(password, dbUser.getPasswordHash()))
                .orElseThrow(() -> new LoginException());

        userDao.setUserSession(user.getEmail(), sessionId);
    }

    public void logout(String userEmail) {
        userDao.setUserSession(userEmail, null);
    }

    public void hhLogin(String email, String sessionId) {
        userDao.upsertOAuthUser(email, sessionId);
    }
}
