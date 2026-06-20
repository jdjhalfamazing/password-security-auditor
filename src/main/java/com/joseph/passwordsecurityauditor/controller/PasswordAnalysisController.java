package com.joseph.passwordsecurityauditor.controller;

import com.joseph.passwordsecurityauditor.model.PasswordAnalysisRequest;
import com.joseph.passwordsecurityauditor.model.PasswordAnalysisResponse;
import com.joseph.passwordsecurityauditor.service.PasswordAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PasswordAnalysisController {

    @Autowired
    private PasswordAnalysisService passwordAnalysisService;

    @PostMapping("/analyze")
    public PasswordAnalysisResponse analyzePassword(
            @RequestBody PasswordAnalysisRequest request) {

        return passwordAnalysisService
                .analyzePassword(request.getPassword());
    }
}