package ru.gowork.resource;


import ru.gowork.service.AnswerService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class AnswerResource {
    private final AnswerService service;

    public AnswerResource(AnswerService service) {
        this.service = service;
    }

    @Path("/answer/explanation")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response saveAnswer(@Context SecurityContext securityContext,
                               String answer) {
        String userEmail = securityContext.getUserPrincipal().getName();

        return service.saveAnswerGetExplanation(userEmail, answer)
                .map(explanation -> Response.ok(explanation).build())
                .orElseGet(() -> Response.status(Response.Status.NOT_FOUND).build());
    }
}
