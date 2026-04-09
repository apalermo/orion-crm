package com.openclassroom.devops.orion.microcrm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FrontendLogController.class)
public class FrontendLogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldAcceptFrontendLogsAndReturn200Ok() throws Exception {        
        String logPayload = "{\"message\":\"Erreur de test unitaire Spring\", \"url\":\"http://localhost\"}";
        
        mockMvc.perform(post("/api/logs/frontend")
                .contentType(MediaType.APPLICATION_JSON)
                .content(logPayload))                
                .andExpect(status().isOk());
    }
}