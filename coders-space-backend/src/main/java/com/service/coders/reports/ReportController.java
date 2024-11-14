package com.service.coders.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity getReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }
    @PostMapping
    public ResponseEntity createUpdate(@RequestBody Reports reports) {
        return ResponseEntity.ok(reportService.createReport(reports));
    }
}
