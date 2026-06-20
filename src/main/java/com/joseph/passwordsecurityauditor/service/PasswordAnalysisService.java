package com.joseph.passwordsecurityauditor.service;

import com.joseph.passwordsecurityauditor.model.PasswordAnalysisResponse;
import org.springframework.stereotype.Service;

@Service
public class PasswordAnalysisService {

    public PasswordAnalysisResponse analyzePassword(String password) {

        PasswordAnalysisResponse response = new PasswordAnalysisResponse();

        int score = 0;

        if (password.length() >= 8) {
            score += 20;
        }

        if (password.matches(".*[A-Z].*")) {
            score += 20;
        }

        if (password.matches(".*[a-z].*")) {
            score += 20;
        }

        if (password.matches(".*\\d.*")) {
            score += 20;
        }

        if (password.matches(".*[!@#$%^&*()].*")) {
            score += 20;
        }

        response.setScore(score);

        if (score >= 80) {
            response.setStrength("Strong");
        } else if (score >= 60) {
            response.setStrength("Moderate");
        } else {
            response.setStrength("Weak");
        }

        response.setEntropy(password.length() * 4);

        response.setWarnings("None");
        response.setRecommendations(
                "Password meets basic security requirements");

        return response;
    }
}