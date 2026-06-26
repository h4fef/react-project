package com.react.practice_manager.controller;
import com.react.practice_manager.entity.Practice;
import com.react.practice_manager.repository.PracticeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/practices")
@CrossOrigin(origins = "http://localhost:5173")
public class PracticeController {
    private final PracticeRepository practiceRepository;

    public PracticeController(PracticeRepository practiceRepository) {
        this.practiceRepository = practiceRepository;
    }
    @GetMapping
    public List<Practice> getAllPractices() {
        return practiceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Practice getPracticeById(@PathVariable Long id) {
        return practiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pratica non trovata"));
    }

    @PostMapping
    public Practice createPractice(@RequestBody Practice practice) {
        return practiceRepository.save(practice);
    }

    @PutMapping("/{id}")
    public Practice updatePractice(@PathVariable Long id, @RequestBody Practice updatedPractice) {
        Practice practice = practiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pratica non trovata"));

        practice.setTitle(updatedPractice.getTitle());
        practice.setDescription(updatedPractice.getDescription());
        practice.setStatus(updatedPractice.getStatus());

        return practiceRepository.save(practice);
    }

    @DeleteMapping("/{id}")
    public void deletePractice(@PathVariable Long id) {
        practiceRepository.deleteById(id);
    }
}
