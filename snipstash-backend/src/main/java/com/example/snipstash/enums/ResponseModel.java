package com.example.snipstash.enums;


import lombok.Data;
/**
 * Author: Naveen Saini
 * Date: 20-Apr-2024	
 */
@Data
public class ResponseModel<T> {
	private ResponseType resultType;
	private T data;
}
