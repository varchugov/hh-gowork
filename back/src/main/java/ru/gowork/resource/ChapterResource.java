package ru.gowork.resource;


import ru.gowork.dto.ChapterDto;
import ru.gowork.service.ChapterService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/content")
@Produces(MediaType.APPLICATION_JSON)
public class ChapterResource {
    private final ChapterService service;

    public ChapterResource(ChapterService service) {
        this.service = service;
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ChapterDto> getContent(@Context SecurityContext securityContext) {
        String userEmail = securityContext.getUserPrincipal().getName();
        List<ChapterDto> dtoList = service.getContent(userEmail);
        return dtoList;
    }
}
