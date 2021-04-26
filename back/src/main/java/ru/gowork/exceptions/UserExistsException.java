package ru.gowork.exceptions;

public class UserExistsException extends Exception {
  public UserExistsException() {
    super("User already exists!");
  }

}
