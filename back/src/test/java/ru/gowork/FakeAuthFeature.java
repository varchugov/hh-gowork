package ru.gowork;

import ru.gowork.config.AnonymousAllowed;

import javax.ws.rs.container.DynamicFeature;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.Provider;

@Provider
public class FakeAuthFeature implements DynamicFeature {

    @Override
    public void configure(ResourceInfo resourceInfo, FeatureContext context) {
        if (!resourceInfo.getResourceMethod().isAnnotationPresent(AnonymousAllowed.class)) {
            context.register(FakeAuthFilter.class);
        }
    }
}
