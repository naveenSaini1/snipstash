package com.example.snipstash.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {
	@GetMapping("/admin/myadmin")
	public String getAdmin() {
		return new String("admin");
	}
	@GetMapping("/user/myuser")
	public String getUser() {
		return new String("user");
	}
	

}
