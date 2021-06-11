package ru.gowork.resource;

import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import ru.gowork.exceptions.UserExistsException;
import ru.gowork.service.AuthService;
import ru.gowork.exceptions.LoginException;
import ru.gowork.config.AnonymousAllowed;

import java.util.UUID;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    private final AuthService authService;

    public static final String AUTH_COOKIE_NAME = "gw_session";
    public static final String EMAIL_COOKIE_NAME = "gw_email";
    public static final Integer COOKIE_MAX_AGE = 8 * 60 * 60;

    private String domain;

    public AuthResource(AuthService authService) {
        this.authService = authService;
        this.domain = System.getenv("COOKIE_DOMAIN");
    }

    private Cookie buildCookie(String name, String value, String comment, Boolean httpOnly) {
        Cookie resultCookie = new Cookie(name, value);
        resultCookie.setPath("/");
        resultCookie.setComment(comment);
        resultCookie.setDomain(domain);
        resultCookie.setHttpOnly(httpOnly);
        resultCookie.setMaxAge(COOKIE_MAX_AGE);
        resultCookie.setSecure(true);
        return resultCookie;
    }

    @Path("/register")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @POST
    @AnonymousAllowed
    public void registerUser(@FormParam("email") String email,
                             @FormParam("password") String password) {
        try {
            authService.registerUser(email, password);
        } catch (UserExistsException e) {
            throw new WebApplicationException("User with specified email already exists", Response.Status.BAD_REQUEST);
        }
    }

    @Path("/login")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @POST
    @AnonymousAllowed
    public void login(@FormParam("email") String email, @FormParam("password") String password,
                      @Context HttpServletRequest request, @Context HttpServletResponse response) {
        String sessionId = UUID.randomUUID().toString();
        try {
            authService.login(email, password, sessionId);

            // set auth cookie
            Cookie authCookie = buildCookie(AUTH_COOKIE_NAME, sessionId, "gowork auth cookie", true);
            response.addCookie(authCookie);

            // set email cookie
            Cookie emailCookie = buildCookie(EMAIL_COOKIE_NAME, email, "gowork email cookie", false);
            response.addCookie(emailCookie);
        } catch (LoginException e) {
            throw new WebApplicationException("invalid email/password", Status.FORBIDDEN);
        }
    }

    @Path("/logout")
    @PUT
    public void logout(@Context HttpServletRequest request, @Context SecurityContext securityContext) {
        String userEmail = securityContext.getUserPrincipal().getName();
        authService.logout(userEmail);
    }
}
