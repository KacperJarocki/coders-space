package com.service.coders.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    ReportRepository reportRepository;
    public Reports createReport(Reports report) {
        report.setDate(LocalDateTime.now());
       return reportRepository.save(report);
    }

    public List<Reports> getAllReports() {
        return reportRepository.findAllByOrderByDateDesc();
    }
}
