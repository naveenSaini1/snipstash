package com.example.snipstash.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.snipstash.model.ResponseMessage;
import com.example.snipstash.model.User;
import com.example.snipstash.repositary.UserRepo;

@RestController
@RequestMapping("/api/test")
public class TestingController {
	@Autowired
	private UserRepo repo;
	
	@GetMapping("/hello")
	public String getHello() {
		return new String ("hello");
	}
	
//	@GetMapping("/getAll")
//	public Map<String,ResponseMessage<List<User>>> getUserByName(@RequestParam("email") String email){
//		User user=new User();
//		user.setEmail(email);
//		return repo.getTheUserByEmail(user);
//	}

	

}
