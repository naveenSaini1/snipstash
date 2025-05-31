package com.example.snipstash.serviceimpl;

import com.example.snipstash.model.Folder;
import com.example.snipstash.repositary.FolderRepository;
import com.example.snipstash.service.FolderService;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.enums.ResponseType;
import com.example.snipstash.exceptions.MyCustomeException;
import com.example.snipstash.utitly.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderServiceImpl implements FolderService {

    @Autowired
    private FolderRepository folderRepository;
    
    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public ResponseModel<Integer> createFolder(Folder folder) throws MyCustomeException {
        // Get the logged-in user's email using SecurityUtils
        String userEmail = securityUtils.getLoggedInUserEmail();
        System.out.println(" useremail "+userEmail);
        Integer result = folderRepository.insertAndReturnId(folder, userEmail);

        if (result > 0) {
            ResponseModel<Integer> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData(result);
            return response;
        } else {
            throw new MyCustomeException("Failed to save folder.");
        }
    }

    @Override
    public ResponseModel<String> deleteFolder(Integer id) throws MyCustomeException {
        int result = folderRepository.delete(id);

        if (result > 0) {
            ResponseModel<String> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData("Folder deleted successfully.");
            return response;
        } else {
            throw new MyCustomeException("Folder with ID " + id + " not found or failed to delete.");
        }
    }

    @Override
    public ResponseModel<List<Folder>> getAllFolders() throws MyCustomeException {
        String userEmail = securityUtils.getLoggedInUserEmail();
        List<Folder> folders = folderRepository.findByUserEmail(userEmail);
        ResponseModel<List<Folder>> response = new ResponseModel<>();
        response.setResultType(ResponseType.SUCCESS);
        response.setData(folders);
        return response;
    }
} 