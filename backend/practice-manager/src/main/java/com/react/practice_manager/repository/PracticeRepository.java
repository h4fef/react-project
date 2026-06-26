package com.react.practice_manager.repository;
import com.react.practice_manager.entity.Practice;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PracticeRepository extends JpaRepository<Practice, Long>{

}
