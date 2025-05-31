package com.example.snipstash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.enums.ResponseType;




/**
 * Author: Naveen Saini Date: 22-Apr-2024
 */
@ControllerAdvice
public class GlobalExepctionHandller {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseModel<String>> handleValidationException(MethodArgumentNotValidException e) {
		System.out.println("inside exception method of mehtodargument" + e.getMessage());
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
		response.setResultType(ResponseType.FAIL);
		System.out.println("Inside the Method arugmentnot valid excetion handler and the issue is: "+e.getMessage());

		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);
	}

	@ExceptionHandler(MyCustomeException.class)
	public ResponseEntity<ResponseModel<String>> handleValidationOnUserException(MyCustomeException e) {
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(e.getMessage());
		response.setResultType(ResponseType.FAIL);
		System.out.println("Inside the my custome excpetion handler and the issue is: "+e.getMessage());

		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);

	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseModel<String>> handleException(Exception e) {
		System.out.println("inside exception method of excetpion");
		ResponseModel<String> response = new ResponseModel<>();
		response.setData("Something went wrong");
		System.out.println("Inside the main excpetion handler and the issue is: "+e.getMessage());
		response.setResultType(ResponseType.FAIL);
		e.printStackTrace();
		
		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);
	}
	
}
