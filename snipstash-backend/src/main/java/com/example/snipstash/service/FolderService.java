package com.example.snipstash.service;

import com.example.snipstash.model.Folder;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.exceptions.MyCustomeException;

import java.util.List;

public interface FolderService {
    // Method to create a folder, returning the generated ID
    ResponseModel<Integer> createFolder(Folder folder) throws MyCustomeException;

    // Method to delete a folder by id
    ResponseModel<String> deleteFolder(Integer id) throws MyCustomeException;

    // Method to get all folders
    ResponseModel<List<Folder>> getAllFolders() throws MyCustomeException;
} 