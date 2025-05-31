package com.example.snipstash.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Snippet {
    private Integer id;
    private String title;
    private String language;
    private String code;
    private String tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String folderId; // Assuming folderId is a String for now, adjust if needed
    private Integer copyCount;
    private Integer userId;
} 