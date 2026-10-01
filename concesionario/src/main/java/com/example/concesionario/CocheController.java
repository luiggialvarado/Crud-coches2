package com.example.concesionario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/coches")
@CrossOrigin(origins = "*")
public class CocheController {

    @Autowired
    private CocheRepository repo;

    @GetMapping
    public List<Coche> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coche> buscar(@PathVariable Long id) {
        Coche coche = repo.findById(id).orElse(null);
        if (coche == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(coche);
    }

    @PostMapping
    public Coche crear(@RequestBody Coche coche) {
        coche.setId(null);
        return repo.save(coche);
    }

    @Autowired
    private CocheService service;
    
    @PutMapping("/{id}")
    public ResponseEntity<Coche> modificar(@PathVariable Long id, @RequestBody Coche datos) {
        Coche guardado = service.modificar(id, datos);
        if (guardado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(guardado);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}