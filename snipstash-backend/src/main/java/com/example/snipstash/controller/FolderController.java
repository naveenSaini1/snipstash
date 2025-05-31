package com.example.snipstash.controller;

import com.example.snipstash.model.Folder;
import com.example.snipstash.service.FolderService;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.exceptions.MyCustomeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PostMapping("/createfolder")
    public ResponseEntity<ResponseModel<Integer>> createFolder(@RequestBody Folder folder) throws MyCustomeException {
        ResponseModel<Integer> response = folderService.createFolder(folder);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deletefolder/{id}")
    public ResponseEntity<ResponseModel<String>> deleteFolder(@PathVariable Integer id) throws MyCustomeException {
        ResponseModel<String> response = folderService.deleteFolder(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseModel<List<Folder>>> getAllFolders() throws MyCustomeException {
        ResponseModel<List<Folder>> response = folderService.getAllFolders();
        return ResponseEntity.ok(response);
    }
} 