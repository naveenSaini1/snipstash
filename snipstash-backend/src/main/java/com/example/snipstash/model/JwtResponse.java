package com.example.snipstash.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@NoArgsConstructor
public class JwtResponse {
	  private String token;
	  private String type = "Bearer";
	  private String email;
	  private String roles;
	  
	  public JwtResponse(String accessToken , String email, String roles) {
		    this.token = accessToken;
		    this.email = email;
		    this.roles = roles;
		  }
 
	  

}
