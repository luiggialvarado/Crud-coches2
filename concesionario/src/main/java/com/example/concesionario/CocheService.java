package com.example.concesionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CocheService {

    @Autowired
    private CocheRepository repo;

    public Coche modificar(Long id, Coche datos) {
        if (!repo.existsById(id)) {
            return null;
        }
        datos.setId(id);
        return repo.save(datos);
    }   
}
    

