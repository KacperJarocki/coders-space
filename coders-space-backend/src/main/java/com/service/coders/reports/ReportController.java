package com.service.coders.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity getReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }
}
