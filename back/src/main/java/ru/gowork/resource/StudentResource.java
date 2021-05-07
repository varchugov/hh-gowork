package ru.gowork.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.WebApplicationException;

import javax.inject.Singleton;

import ru.gowork.config.AnonymousAllowed;
import ru.gowork.service.StudentsService;
import ru.gowork.dto.StudentDto;
import ru.gowork.exceptions.StudentNotFoundException;

@Path("/students")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class StudentResource {
    private final StudentsService service;

    public StudentResource(StudentsService service) {
        this.service = service;
    }

    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @POST
    @AnonymousAllowed
    public StudentDto createStudent(@FormParam("username") String username) {
        return service.createStudent(username);
    }

    @Path("/{student_id}")
    @GET
    @AnonymousAllowed
    public StudentDto getStudent(@PathParam("student_id") Integer id) throws WebApplicationException {
        try {
            return service.getStudentById(id);
        } catch (StudentNotFoundException e) {
            throw new WebApplicationException("student with the specified id was not found", Status.NOT_FOUND);
        }
    }
}
