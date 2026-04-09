package com.openclassroom.devops.orion.microcrm;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:4200") 
public class FrontendLogController {

    private static final Logger logger = LoggerFactory.getLogger(FrontendLogController.class);

    @PostMapping("/frontend")
    public void receiveFrontendLogs(@RequestBody Map<String, Object> logPayload) {        
        logger.error("FRONTEND_ERROR: {}", logPayload);
    }
}