package ru.gowork.config;

import java.io.IOException;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.container.ResourceInfo;

import java.util.Optional;
import java.security.Principal;

import ru.gowork.dao.UserDao;
import ru.gowork.resource.AuthResource;

import org.springframework.beans.factory.annotation.Autowired;

public class AuthFilter implements ContainerRequestFilter {

    @Inject
    private ResourceInfo resourceInfo;

    @Autowired
    private UserDao userDao;

    private static Optional<String> getCookieValue(ContainerRequestContext requestContext) {
        return Optional.ofNullable(requestContext.getCookies())
                .map(cookieMap -> cookieMap.get(AuthResource.AUTH_COOKIE_NAME))
                .map(Cookie::getValue);
    }

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        // unwrap user for map chain to work correctly
        // otherwise we will get Optional<Optional<User>>
        getCookieValue(requestContext).flatMap(value -> userDao.getUserBySessionId(value))
                .ifPresentOrElse(
                    (user) -> {
                        // set user email to security context
                        requestContext.setSecurityContext(new SecurityContext() {
                            @Override
                            public Principal getUserPrincipal() {
                                return new Principal() {
                                    @Override
                                    public String getName() {
                                        return user.getEmail();
                                    }
                                };
                            }

                            @Override
                            public boolean isUserInRole(String role) {
                                return role.equals("user");
                            }

                            @Override
                            public boolean isSecure() {
                                return requestContext.getUriInfo().getAbsolutePath().toString().startsWith("https");
                            }

                            @Override
                            public String getAuthenticationScheme() {
                                return "Gw-Auth-Scheme";
                            }
                        });
                    },
                    () -> {
                        requestContext.abortWith(Response.status(Status.UNAUTHORIZED).entity("unauthenticated").build());
                    });
    }

}
