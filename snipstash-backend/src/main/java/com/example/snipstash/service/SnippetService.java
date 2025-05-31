package com.example.snipstash.service;

import com.example.snipstash.model.Snippet;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.exceptions.MyCustomeException;

import java.util.List;

public interface SnippetService {
    // Method to create a snippet
    ResponseModel<Integer> createSnippet(Snippet snippet) throws MyCustomeException;

    // Method to delete a snippet by id
    ResponseModel<String> deleteSnippet(Integer id) throws MyCustomeException;

    // Method to get all snippets
    ResponseModel<List<Snippet>> getAllSnippets() throws MyCustomeException;

    // Method to increase snippet copy count
    ResponseModel<String> increaseSnippetCopyCount(Integer id) throws MyCustomeException;
} 