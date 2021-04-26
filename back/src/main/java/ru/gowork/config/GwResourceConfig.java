package ru.gowork.config;

import org.glassfish.jersey.server.ResourceConfig;

public class GwResourceConfig extends ResourceConfig {
    public GwResourceConfig() {
        register(AuthFeature.class);

        register(AuthFilter.class);
    }
}
