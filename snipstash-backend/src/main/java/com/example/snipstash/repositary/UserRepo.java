package com.example.snipstash.repositary;

import java.util.List;
import java.util.Map;

import com.example.snipstash.model.ResponseMessage;
import com.example.snipstash.model.User;

public interface UserRepo {
	public  Integer insertTheUser(User user);
	public  Map<String,ResponseMessage<Integer>> updateTheUser(User user);
	public  Map<String,ResponseMessage<Integer>> deleteTheUser(User user);
	public  Map<String,ResponseMessage<Integer>> insertUserInBatch(List<User> user);
	public  Map<String,ResponseMessage<List<User>>> getAlltheUser();
	User getTheUserByEmail(User user);

	

}
