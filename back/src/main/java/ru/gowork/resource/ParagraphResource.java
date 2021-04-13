package ru.gowork.resource;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;

import ru.gowork.service.ParagraphService;
import ru.gowork.dto.ParagraphDto;
import ru.gowork.dto.CheckAnswerDto;

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

    @Path("/chapters/{chapter_id}/paragraphs/{paragraph_id}/steps/{step_id}/next")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public ParagraphDto getNextStep(@PathParam("chapter_id") Integer chapterId,
                                @PathParam("paragraph_id") Integer currentParagraphId,
                                @PathParam("step_id") Integer currentStepId) {
        return service.getNextStepInParagraph(currentParagraphId, currentStepId);
    }

    @Path("/chapters/{chapter_id}/paragraphs/{paragraph_id}/steps/{step_id}/check_answer")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @PUT
    public CheckAnswerDto getNextStep(@PathParam("chapter_id") Integer chapterId,
                                @PathParam("paragraph_id") Integer currentParagraphId,
                                @PathParam("step_id") Integer currentStepId,
                                @FormParam("answers") List<Integer> userAnswers) {
        CheckAnswerDto checkAnswerDto = service.checkStepAnswer(currentStepId, userAnswers);
        return checkAnswerDto;
    }
}
