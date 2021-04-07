package ru.gowork.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.gowork.entity.HelloWorldEntity;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Singleton
@Path("/")
public class ExampleResource {

  private static final Logger logger = LoggerFactory.getLogger(ExampleResource.class);
  private HelloWorldEntity helloWorldEntity = new HelloWorldEntity("world");

  @GET
  public Response get() {
    logger.info("Print " + helloWorldEntity.getString());
    return Response.ok(helloWorldEntity.getString()).build();
  }

  @POST
  public Response post(@QueryParam(value = "name") String name) {
    logger.info("Set input name: " + name);
    helloWorldEntity.setName(name);
    return Response.ok().build();
  }

  @DELETE
  public Response delete() {
    logger.info("Delete name");
    helloWorldEntity.deleteName();
    return Response.ok().build();
  }
}
