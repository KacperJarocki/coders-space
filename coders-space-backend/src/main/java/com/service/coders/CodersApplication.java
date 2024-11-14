package com.service.coders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CodersApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodersApplication.class, args);
	}

}
