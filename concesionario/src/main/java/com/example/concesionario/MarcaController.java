package com.example.concesionario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/marcas")
public class MarcaController {

    @Autowired
    private MarcaRepository repo;

    @GetMapping
    public List<Marca> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marca> buscar(@PathVariable Long id) {
        Marca marca = repo.findById(id).orElse(null);
        if (marca == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(marca);
    }

    @PostMapping
    public Marca crear(@RequestBody Marca marca) {
        marca.setId(null);
        return repo.save(marca);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marca> modificar(@PathVariable Long id, @RequestBody Marca datos) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        datos.setId(id);
        return ResponseEntity.ok(repo.save(datos));
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
