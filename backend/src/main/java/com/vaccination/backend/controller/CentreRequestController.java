package com.vaccination.backend.controller;

import com.vaccination.backend.entity.CentreRequest;
import com.vaccination.backend.service.CentreRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centre-requests")
@CrossOrigin
public class CentreRequestController {

    private final CentreRequestService centreRequestService;

    public CentreRequestController(CentreRequestService centreRequestService) {
        this.centreRequestService = centreRequestService;
    }

    @PostMapping
    public CentreRequest createRequest(@RequestBody CentreRequest request) {
        return centreRequestService.createRequest(request);
    }

    @GetMapping
    public List<CentreRequest> getAllRequests() {
        return centreRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public Optional<CentreRequest> getRequestById(@PathVariable Long id) {
        return centreRequestService.getRequestById(id);
    }
    @GetMapping("/user/{userId}")
    public CentreRequest getRequestByUserId(@PathVariable Long userId) {
        return centreRequestService.getRequestByUserId(userId);
    }

    @PutMapping
    public CentreRequest updateRequest(@RequestBody CentreRequest request) {
        return centreRequestService.updateRequest(request);
    }
}