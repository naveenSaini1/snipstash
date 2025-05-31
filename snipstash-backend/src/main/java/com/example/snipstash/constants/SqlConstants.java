package com.example.snipstash.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Author: Naveen Saini 

 */

@Component
@PropertySource("classpath:sql.properties")
public class SqlConstants {
	// users query
    @Value("${INSERT_INTO_USER}")
	public		 String			 INSERT_INTO_USER;
    
    
    @Value("${SELECT_USER}")
    public		 String 			SELECT_USER;
   
    @Value("${INSERT_INTO_FOLDER}")
    public		 String 			INSERT_INTO_FOLDER;
   
    @Value("${DELETE_FOLDER_BY_ID}")
    public		 String 			DELETE_FOLDER_BY_ID;
   
    @Value("${INSERT_INTO_SNIPPET}")
    public		 String 			INSERT_INTO_SNIPPET;
   
    @Value("${DELETE_SNIPPET_BY_ID}")
    public		 String 			DELETE_SNIPPET_BY_ID;
   
    @Value("${SELECT_ALL_FOLDERS}")
    public		 String 			SELECT_ALL_FOLDERS;
   
    @Value("${SELECT_ALL_SNIPPETS}")
    public		 String 			SELECT_ALL_SNIPPETS;
   
    @Value("${UPDATE_SNIPPET_COPY_COUNT}")
    public		 String 			UPDATE_SNIPPET_COPY_COUNT;
   
 }

