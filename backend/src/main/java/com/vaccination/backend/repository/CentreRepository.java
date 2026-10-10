package com.vaccination.backend.repository;

import com.vaccination.backend.entity.Centre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CentreRepository extends JpaRepository<Centre, Long> {

}