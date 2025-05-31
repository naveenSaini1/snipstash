package com.example.snipstash.repositaryimpl;

import com.example.snipstash.model.Folder;
import com.example.snipstash.repositary.FolderRepository;
import com.example.snipstash.constants.SqlConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class FolderRepositoryImpl implements FolderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private SqlConstants sqlConstants;

    @Override
    public int save(Folder folder) {
        // This method is no longer used for returning ID, but kept for compatibility if needed elsewhere
        String sql = sqlConstants.INSERT_INTO_FOLDER; // Note: This SQL now includes RETURNING id
        return jdbcTemplate.update(sql, folder.getName(), folder.getSnippetLength(), folder.getUserId());
    }
    

    @Override
    public int delete(Integer id) {
        String sql = sqlConstants.DELETE_FOLDER_BY_ID;
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public List<Folder> findAll() {
        // This method is no longer used directly for getting all folders for the logged-in user
        String sql = sqlConstants.SELECT_ALL_FOLDERS;
        return jdbcTemplate.query(sql, new FolderRowMapper());
    }

    @Override
    public List<Folder> findByUserEmail(String userEmail) {
        String sql = sqlConstants.SELECT_ALL_FOLDERS;
        return jdbcTemplate.query(sql, new Object[]{userEmail}, new FolderRowMapper());
    }

    @Override
    public Integer insertAndReturnId(Folder folder, String userEmail) {
        String sql = sqlConstants.INSERT_INTO_FOLDER; // This SQL includes RETURNING id
        return jdbcTemplate.queryForObject(sql,
                new Object[]{folder.getName(), folder.getSnippetLength(), userEmail},
                new RowMapper<Integer>() {
                    @Override
                    public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return rs.getInt(1);
                    }
                }
        );
    }

    private static class FolderRowMapper implements RowMapper<Folder> {
        @Override
        public Folder mapRow(ResultSet rs, int rowNum) throws SQLException {
            Folder folder = new Folder();
            folder.setId(rs.getInt("id"));
            folder.setName(rs.getString("name"));
            folder.setSnippetLength(rs.getInt("snippet_length"));
            folder.setUserId(rs.getInt("user_id"));
            return folder;
        }
    }
} 