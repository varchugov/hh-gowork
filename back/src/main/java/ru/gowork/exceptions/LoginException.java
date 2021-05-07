package ru.gowork.exceptions;

public class LoginException extends Exception {
    public LoginException() {
        super("login failed");
    }
}
