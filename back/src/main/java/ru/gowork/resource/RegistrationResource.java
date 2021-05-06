package ru.gowork.resource;


import ru.gowork.exceptions.UserExistsException;
import ru.gowork.service.RegistrationService;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/register")
@Produces(MediaType.APPLICATION_JSON)
public class RegistrationResource {
  private final RegistrationService service;

  public RegistrationResource(RegistrationService service) {
    this.service = service;
  }

  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @POST
  public void registerUser(@FormParam("email") String email,
                           @FormParam("password") String password) {
    try {
      service.registerUser(email, password);
    } catch (UserExistsException e) {
      throw new WebApplicationException("User with specified email already exists", Response.Status.BAD_REQUEST);
    }
  }
}
