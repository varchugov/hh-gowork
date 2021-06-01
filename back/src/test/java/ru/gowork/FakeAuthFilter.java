package ru.gowork;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.SecurityContext;

import java.security.Principal;


public class FakeAuthFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        requestContext.setSecurityContext(new SecurityContext() {
            @Override
            public Principal getUserPrincipal() {
                return new Principal() {
                    @Override
                    public String getName() {
                        return BaseTest.FAKE_USER_EMAIL;
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
    }
}
