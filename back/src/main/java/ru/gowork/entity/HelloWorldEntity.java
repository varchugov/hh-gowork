package ru.gowork.entity;

public class HelloWorldEntity {
  private final String HELLO_STRING = "Hello, ";
  private final String EXCLAMATION_MARK = "!";
  private String name;

  public HelloWorldEntity(String name) {
    this.name = name;
  }

  public synchronized String getString() {
    return HELLO_STRING + name + EXCLAMATION_MARK;
  }

  public synchronized void setName(String name) {
    if (name != null) {
      this.name = name;
    }
  }

  public synchronized void deleteName() {
    this.name = "";
  }

}
