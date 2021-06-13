package ru.gowork.hh;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HHClient {
    private final ObjectMapper hhMapper;

    public HHClient() {
        this.hhMapper = new ObjectMapper();
        // to prevent exception when encountering unknown property:
        hhMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        hhMapper.findAndRegisterModules();
    }

    public HHUser parseMeResponse(String rawResponse) throws JsonProcessingException {
        HHUser hhUser = hhMapper.readValue(rawResponse, HHUser.class);
        return hhUser;
    }
}
