package com.example.snipstash.repositary;

import com.example.snipstash.model.Snippet;

import java.util.List;

public interface SnippetRepository {
    // Method to save a snippet
    int save(Snippet snippet, String userEmail);

    // Method to delete a snippet by id
    int delete(Integer id);

    // Method to find all snippets
    List<Snippet> findAll();

    // Method to find snippets by user email
    List<Snippet> findByUserEmail(String userEmail);

    // Method to insert a snippet and return the generated ID
    Integer insertAndReturnId(Snippet snippet, String userEmail);

    // Method to update snippet copy count and updated date
    int updateCopyCount(Integer id);
} 