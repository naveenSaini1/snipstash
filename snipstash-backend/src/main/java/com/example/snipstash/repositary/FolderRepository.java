package com.example.snipstash.repositary;

import com.example.snipstash.model.Folder;
import java.util.List;

public interface FolderRepository {
    // Method to save a folder
    int save(Folder folder);

    // Method to delete a folder by id
    int delete(Integer id);

    // Method to find all folders
    List<Folder> findAll();

    // Method to find folders by user email
    List<Folder> findByUserEmail(String userEmail);

    // Method to insert a folder and return the generated ID
    Integer insertAndReturnId(Folder folder, String userEmail);
} 