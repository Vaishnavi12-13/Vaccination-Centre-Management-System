package com.vaccination.backend.controller;

import com.vaccination.backend.entity.Centre;
import com.vaccination.backend.service.CentreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centres")
@CrossOrigin
public class CentreController {

    private final CentreService centreService;

    public CentreController(CentreService centreService) {
        this.centreService = centreService;
    }

    @PostMapping
    public Centre createCentre(@RequestBody Centre centre) {
        return centreService.createCentre(centre);
    }

    @GetMapping
    public List<Centre> getAllCentres() {
        return centreService.getAllCentres();
    }

    @GetMapping("/{id}")
    public Optional<Centre> getCentreById(@PathVariable Long id) {
        return centreService.getCentreById(id);
    }

    @PutMapping
    public Centre updateCentre(@RequestBody Centre centre) {
        return centreService.updateCentre(centre);
    }

    @DeleteMapping("/{id}")
    public void deleteCentre(@PathVariable Long id) {
        centreService.deleteCentre(id);
    }
}