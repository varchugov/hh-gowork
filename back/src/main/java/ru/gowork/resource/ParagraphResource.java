package ru.gowork.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import ru.gowork.service.ParagraphService;
import ru.gowork.dto.ParagraphDto;

import java.util.List;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class ParagraphResource {
    private final ParagraphService service;

    public ParagraphResource(ParagraphService service) {
        this.service = service;
    }

    @Path("/chapters/{chapter_id}/paragraphs")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public List<ParagraphDto> getChapterParagraphs(@PathParam("chapter_id") Integer id, @QueryParam("current_step") Integer currentStepId) {
        List<ParagraphDto> paragraphs = service.getChapterParagraphs(id, currentStepId);
        return paragraphs;
    }

    @Path("/steps/{step_id}/next")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public ParagraphDto getNextStep(@PathParam("step_id") Integer currentStepId,
                                @Context SecurityContext securityContext) {
        String userEmail = securityContext.getUserPrincipal().getName();
        return service.getNextStepInParagraph(currentStepId, userEmail);
    }
}
