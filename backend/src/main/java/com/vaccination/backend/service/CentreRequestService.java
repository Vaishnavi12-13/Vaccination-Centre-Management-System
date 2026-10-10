package com.vaccination.backend.service;

import com.vaccination.backend.entity.CentreRequest;
import com.vaccination.backend.repository.CentreRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentreRequestService {

    private final CentreRequestRepository centreRequestRepository;

    public CentreRequestService(
            CentreRequestRepository centreRequestRepository) {
        this.centreRequestRepository = centreRequestRepository;
    }

    public CentreRequest createRequest(CentreRequest request) {
        request.setStatus("Pending");
        return centreRequestRepository.save(request);
    }

    public List<CentreRequest> getAllRequests() {
        return centreRequestRepository.findAll();
    }

    public CentreRequest getRequestByUserId(Long userId) {
        return centreRequestRepository.findByUserId(userId);
    }

    public Optional<CentreRequest> getRequestById(Long id) {
        return centreRequestRepository.findById(id);
    }

    public CentreRequest updateRequest(CentreRequest request) {

        // Find the existing request
        CentreRequest existingRequest = centreRequestRepository
                .findById(request.getId())
                .orElseThrow(() ->
                        new RuntimeException("Centre request not found"));

        // Update the centre only if one was provided
        if (request.getCentre() != null) {
            existingRequest.setCentre(request.getCentre());
        }

        // Update the status only if one was provided
        if (request.getStatus() != null) {
            existingRequest.setStatus(request.getStatus());
        }

        // Preserve the existing patient association
        return centreRequestRepository.save(existingRequest);
    }
}