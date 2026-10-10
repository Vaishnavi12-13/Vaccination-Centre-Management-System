package com.vaccination.backend.repository;

import com.vaccination.backend.entity.CentreRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CentreRequestRepository extends JpaRepository<CentreRequest, Long> {

    CentreRequest findByUserId(Long userId);
}