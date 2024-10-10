package com.zarco.apidraft.Service;

import com.zarco.apidraft.Model.DatosApiDraft;
import com.zarco.apidraft.repository.CrudApiDraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ApiDrarftServiceImplementar implements ApiDraftService {

    // Inyectar un objeto de la clase repository que tiene las operaciones CRUD
    @Autowired
    CrudApiDraftRepository crudApiDraftRepository;

    @Override
    public ArrayList<DatosApiDraft> mostrarTodosJugadores() {
        return (ArrayList<DatosApiDraft>) crudApiDraftRepository.findAll();
    }

    @Override
    public Optional<DatosApiDraft> mostrarJugadorPorId(long id) {
        return crudApiDraftRepository.findById(id);
    }

    @Override
    public DatosApiDraft registrarJugador(DatosApiDraft jugador) {
        return crudApiDraftRepository.save(jugador);
    }

    @Override
    public boolean borrarJugador(long id) {
        try {
            // Buscamos jugador
            Optional<DatosApiDraft> jugadorOptional = crudApiDraftRepository.findById(id);
            // Verificar si existe el jugador
            if (jugadorOptional.isPresent()) {
                // Borrar jugador si existe
                crudApiDraftRepository.delete(jugadorOptional.get());
                return true;
            } else {
                return false;
            }
        } catch (Exception err) {
            return false;
        }
    }
}
