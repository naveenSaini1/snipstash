package com.example.snipstash.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.example.snipstash.model.User;

/**
 * Author: Naveen Saini
 * Date: 30-May-2025	
 */

public class UserRowMapper {
	
	public static class GetTheUser implements ResultSetExtractor<User>{
		@Override
		public User extractData(ResultSet rs) throws SQLException, DataAccessException {
			User user= null;
			while(rs.next()) {
				user = new User();
				user.setU_id(rs.getInt("u_id"));
				user.setAge(rs.getInt("age"));
				user.setBio(rs.getString("bio"));
				user.setEmail(rs.getString("email"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
				user.setName(rs.getString("name"));
				
			}
			return user;
		}
		
	}

}
