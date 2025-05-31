package com.example.snipstash.controller;

import com.example.snipstash.model.Snippet;
import com.example.snipstash.service.SnippetService;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.exceptions.MyCustomeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/snippets")
public class SnippetController {

    @Autowired
    private SnippetService snippetService;

    @PostMapping("/create")
    public ResponseEntity<ResponseModel<Integer>> createSnippet(@RequestBody Snippet snippet) throws MyCustomeException {
        ResponseModel<Integer> response = snippetService.createSnippet(snippet);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseModel<String>> deleteSnippet(@PathVariable Integer id) throws MyCustomeException {
        ResponseModel<String> response = snippetService.deleteSnippet(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseModel<List<Snippet>>> getAllSnippets() throws MyCustomeException {
        ResponseModel<List<Snippet>> response = snippetService.getAllSnippets();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/increasecopycount/{id}")
    public ResponseEntity<ResponseModel<String>> increaseCopyCount(@PathVariable Integer id) throws MyCustomeException {
        ResponseModel<String> response = snippetService.increaseSnippetCopyCount(id);
        return ResponseEntity.ok(response);
    }
}
