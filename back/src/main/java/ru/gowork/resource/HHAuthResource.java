package ru.gowork.resource;

import ru.gowork.config.AnonymousAllowed;
import ru.gowork.hh.HHClient;
import ru.gowork.hh.HHUser;
import ru.gowork.service.AuthService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.WebApplicationException;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Verb;

import com.github.scribejava.apis.HHApi;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.oauth.OAuth20Service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.UUID;


@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class HHAuthResource {

    private final AuthService authService;

    private static final String HH_ME_URL = "https://api.hh.ru/me";

    private final String callbackUrl;
    private final String clientId;
    private final String clientSecret;
    private final OAuth20Service scribeOAuthService;
    private final HHClient hhClient;

    private String domain;

    public HHAuthResource(AuthService authService) {
        this.authService = authService;
        this.callbackUrl = System.getenv("HH_OAUTH_CALLBACK_URL");
        this.clientId = System.getenv("HH_OAUTH_CLIENT_ID");
        this.clientSecret = System.getenv("HH_OAUTH_CLIENT_SECRET");
        this.scribeOAuthService = new ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .callback(callbackUrl)
                .build(HHApi.instance());
        this.hhClient = new HHClient();
        this.domain = System.getenv("COOKIE_DOMAIN");
    }

    private Cookie buildCookie(String name, String value, String comment, Boolean httpOnly) {
        Cookie resultCookie = AuthResource.buildCookieDomainless(name, value, comment, httpOnly);
        resultCookie.setDomain(domain);
        return resultCookie;
    }

    @Path("/hhlogin")
    @GET
    @AnonymousAllowed
    public void loginWithHH(@Context HttpServletResponse response) throws IOException {
        String authorizationUrl = scribeOAuthService.getAuthorizationUrl();
        response.sendRedirect(authorizationUrl);
    }

    @Path("/oauthcallback")
    @GET
    @AnonymousAllowed
    public void loginWithHH(@QueryParam("error") String error,
                            @QueryParam("code") String code,
                            @Context HttpServletResponse response) throws IOException, InterruptedException, ExecutionException {
        if (error != null) {
            throw new WebApplicationException("HH returned error. Did you authorized the app?", Response.Status.FORBIDDEN);
        }
        OAuth2AccessToken accessToken = scribeOAuthService.getAccessToken(code);

        OAuthRequest request = new OAuthRequest(Verb.GET, HH_ME_URL);
        scribeOAuthService.signRequest(accessToken, request);
        com.github.scribejava.core.model.Response HHResponse = scribeOAuthService.execute(request);

        if (HHResponse.getCode() != Response.Status.OK.getStatusCode()) {
            throw new WebApplicationException("HH returned error. Did you authorized the app?", Response.Status.FORBIDDEN);
        }

        HHUser hhUser = hhClient.parseMeResponse(HHResponse.getBody());
        if (hhUser.getEmail() == null) {
            throw new WebApplicationException("Cannot get email from HH. Did you login as a user?", Response.Status.FORBIDDEN);
        }

        String sessionId = UUID.randomUUID().toString();
        authService.hhLogin(hhUser.getEmail(), sessionId);

        // set auth cookie
        Cookie authCookie = buildCookie(AuthResource.AUTH_COOKIE_NAME, sessionId, "gowork auth cookie", true);
        response.addCookie(authCookie);

        // set email cookie
        Cookie emailCookie = buildCookie(AuthResource.EMAIL_COOKIE_NAME, hhUser.getEmail(), "gowork email cookie", false);
        response.addCookie(emailCookie);
    }

}
