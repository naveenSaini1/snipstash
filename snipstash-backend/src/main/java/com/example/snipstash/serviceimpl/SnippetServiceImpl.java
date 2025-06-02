package com.example.snipstash.serviceimpl;

import com.example.snipstash.model.Snippet;
import com.example.snipstash.repositary.SnippetRepository;
import com.example.snipstash.service.SnippetService;
import com.example.snipstash.utitly.SecurityUtils;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.enums.ResponseType;
import com.example.snipstash.exceptions.MyCustomeException;
import com.example.snipstash.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnippetServiceImpl implements SnippetService {

    @Autowired
    private SnippetRepository snippetRepository;
    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public ResponseModel<Integer> createSnippet(Snippet snippet) throws MyCustomeException {
        // Get the logged-in user's email from the security context
        String userEmail = securityUtils.getLoggedInUserEmail();

        // No need to set userId on snippet here, the repository will handle it via email
       
        Integer result = snippetRepository.insertAndReturnId(snippet, userEmail);

        if (result != null && result > 0) {
            ResponseModel<Integer> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData(result);
            return response;
        } else {
            throw new MyCustomeException("Failed to save snippet and retrieve ID.");
        }
    }

    @Override
    public ResponseModel<String> deleteSnippet(Integer id) throws MyCustomeException {
        int result = snippetRepository.delete(id);

        if (result > 0) {
            ResponseModel<String> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData("Snippet deleted successfully.");
            return response;
        } else {
            throw new MyCustomeException("Snippet with ID " + id + " not found or failed to delete.");
        }
    }

    @Override
    public ResponseModel<List<Snippet>> getAllSnippets() throws MyCustomeException {
        String userEmail = securityUtils.getLoggedInUserEmail();
        List<Snippet> snippets = snippetRepository.findByUserEmail(userEmail);
        ResponseModel<List<Snippet>> response = new ResponseModel<>();
        response.setResultType(ResponseType.SUCCESS);
        response.setData(snippets);
        return response;
    }

    @Override
    public ResponseModel<String> increaseSnippetCopyCount(Integer id) throws MyCustomeException {
        int result = snippetRepository.updateCopyCount(id);

        if (result > 0) {
            ResponseModel<String> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData("Snippet copy count increased successfully.");
            return response;
        } else {
            throw new MyCustomeException("Snippet with ID " + id + " not found or failed to update copy count.");
        }
    }

    @Override
    public ResponseModel<String> updateSnippet(Integer id, Snippet updatedSnippet) throws MyCustomeException {
        // Ensure the ID in the path matches the ID in the request body (optional but good practice)
        if (!id.equals(updatedSnippet.getId())) {
            throw new MyCustomeException("Snippet ID in path does not match ID in request body.");
        }

        // Get the logged-in user's email from the security context
        String userEmail = securityUtils.getLoggedInUserEmail();

        // Call the repository to update the snippet
        int result = snippetRepository.update(updatedSnippet, userEmail);

        if (result > 0) {
            ResponseModel<String> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData("Snippet updated successfully.");
            return response;
        } else {
            throw new MyCustomeException("Snippet with ID " + id + " not found or failed to update.");
        }
    }
} 