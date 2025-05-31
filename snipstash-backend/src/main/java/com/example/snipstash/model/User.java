package com.example.snipstash.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
	
	private Integer u_id;
	private String name;
	private String email;
	private String bio;
	private Integer age;
	private String password;
	private String role;
	private String okay;
	

}
