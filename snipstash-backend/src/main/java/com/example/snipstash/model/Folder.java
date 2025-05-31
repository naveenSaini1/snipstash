package com.example.snipstash.model;

import lombok.Data;

@Data
public class Folder {
    private Integer id;
    private String name;
    private Integer snippetLength;
    private Integer userId;
} 