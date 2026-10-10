package com.vaccination.backend.service;

import com.vaccination.backend.entity.Centre;
import com.vaccination.backend.repository.CentreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentreService {

    private final CentreRepository centreRepository;

    public CentreService(CentreRepository centreRepository) {
        this.centreRepository = centreRepository;
    }

    public Centre createCentre(Centre centre) {
        return centreRepository.save(centre);
    }

    public List<Centre> getAllCentres() {
        return centreRepository.findAll();
    }

    public Optional<Centre> getCentreById(Long id) {
        return centreRepository.findById(id);
    }

    public Centre updateCentre(Centre centre) {
        return centreRepository.save(centre);
    }

    public void deleteCentre(Long id) {
        centreRepository.deleteById(id);
    }
}