package com.service.coders.reports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Reports,Integer> {
    List<Reports> findAllByOrderByDateDesc();
}
