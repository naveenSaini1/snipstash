package com.example.snipstash.repositaryimpl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.snipstash.constants.SqlConstants;
import com.example.snipstash.model.ResponseMessage;
import com.example.snipstash.model.User;
import com.example.snipstash.repositary.UserRepo;
import com.example.snipstash.rowmapper.UserRowMapper;

@Repository
public class UserRepoImpl implements UserRepo{
	
	@Autowired
	private JdbcTemplate  jdbcTemplate;
	
	@Autowired
	private SqlConstants	sqlConstants;

	@Override
	public  Integer insertTheUser(User user) {
		try {
			Integer rowaffected= jdbcTemplate.update(sqlConstants.INSERT_INTO_USER,user.getName(),user.getBio(),user.getAge(),user.getPassword(),user.getEmail(),user.getRole());
			return rowaffected;
		}
		catch(Exception e){
			System.out.println(e.getMessage()+" inserTheUser");
		}
		return 0;
	}

	@Override
	public Map<String, ResponseMessage<Integer>> updateTheUser(User user) {
		return null;
	}

	@Override
	public Map<String, ResponseMessage<Integer>> deleteTheUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, ResponseMessage<Integer>> insertUserInBatch(List<User> user) {
		return null;
	}

	@Override
	public Map<String, ResponseMessage<List<User>>> getAlltheUser() {
		return null;
	}

	@Override
	public User getTheUserByEmail(User user) {
		User 	response	=	null;
		Object[]	data	=	{user.getEmail()};
		System.out.println(data+" "+sqlConstants.SELECT_USER);
		try {
			response=	jdbcTemplate.query(sqlConstants.SELECT_USER,new UserRowMapper.GetTheUser(),data);

			
		} catch (Exception e) {
			
			System.out.println(e.getMessage()+" getTheuserByEmail");
		}
		System.out.println(" getTheuserByEmail"+response);

		return response;
	
	}


	
}
