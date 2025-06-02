package com.example.snipstash.repositaryimpl;

import com.example.snipstash.model.Snippet;
import com.example.snipstash.repositary.SnippetRepository;
import com.example.snipstash.constants.SqlConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class SnippetRepositoryImpl implements SnippetRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private SqlConstants sqlConstants;

    @Override
    public int save(Snippet snippet, String userEmail) {
        // TODO: Use the SQL insert query from sql.properties
        String sql = sqlConstants.INSERT_INTO_SNIPPET;
        return jdbcTemplate.update(sql,
                snippet.getTitle(),
                snippet.getLanguage(),
                snippet.getCode(),
                snippet.getTags(),
                Timestamp.valueOf(LocalDateTime.now()), // createdAt
                Timestamp.valueOf(LocalDateTime.now()), // updatedAt
                snippet.getFolderId(),
                snippet.getCopyCount(),
                userEmail // Pass userEmail here
        );
    }

    @Override
    public int delete(Integer id) {
        String sql = sqlConstants.DELETE_SNIPPET_BY_ID;
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public List<Snippet> findAll() {
        // This method is no longer used directly for getting all snippets for the logged-in user
        String sql = sqlConstants.SELECT_ALL_SNIPPETS;
        return jdbcTemplate.query(sql, new SnippetRowMapper());
    }

    @Override
    public List<Snippet> findByUserEmail(String userEmail) {
        String sql = sqlConstants.SELECT_ALL_SNIPPETS;
        return jdbcTemplate.query(sql, new Object[]{userEmail}, new SnippetRowMapper());
    }

    @Override
    public Integer insertAndReturnId(Snippet snippet, String userEmail) {
        String sql = sqlConstants.INSERT_INTO_SNIPPET;
        return jdbcTemplate.queryForObject(sql,
                new Object[]{
                    snippet.getTitle(),
                    snippet.getLanguage(),
                    snippet.getCode(),
                    snippet.getTags(),
                    Timestamp.valueOf(LocalDateTime.now()), // createdAt
                    Timestamp.valueOf(LocalDateTime.now()), // updatedAt
                    snippet.getFolderId(),
                    snippet.getCopyCount(),
                    userEmail // Pass userEmail here
                },
                new RowMapper<Integer>() {
                    @Override
                    public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return rs.getInt(1);
                    }
                }
        );
    }

    @Override
    public int updateCopyCount(Integer id) {
        String sql = sqlConstants.UPDATE_SNIPPET_COPY_COUNT;
        return jdbcTemplate.update(sql, Timestamp.valueOf(LocalDateTime.now()), id);
    }

    @Override
    public int update(Snippet snippet, String userEmail) {
        String sql = sqlConstants.UPDATE_SNIPPET;
        return jdbcTemplate.update(sql,
                snippet.getTitle(),
                snippet.getLanguage(),
                snippet.getCode(),
                snippet.getTags(),
                Timestamp.valueOf(LocalDateTime.now()), // updatedAt
                snippet.getFolderId(),
                snippet.getId(),
                userEmail // Add userEmail to the WHERE clause for security
        );
    }

    private static class SnippetRowMapper implements RowMapper<Snippet> {
        @Override
        public Snippet mapRow(ResultSet rs, int rowNum) throws SQLException {
            Snippet snippet = new Snippet();
            snippet.setId(rs.getInt("id"));
            snippet.setTitle(rs.getString("title"));
            snippet.setLanguage(rs.getString("language"));
            snippet.setCode(rs.getString("code"));
            snippet.setTags(rs.getString("tags"));
            snippet.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            snippet.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
            snippet.setFolderId(rs.getString("folder_id"));
            snippet.setCopyCount(rs.getInt("copy_count"));
            snippet.setUserId(rs.getInt("user_id")); // Include userId
            return snippet;
        }
    }
} 