package com.zarco.apidraft.controler;

import com.zarco.apidraft.Model.DatosApiDraft;
import com.zarco.apidraft.Service.ApiDraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api-draft")
@CrossOrigin(origins = "http://localhost:3000") // Permite peticiones desde el puerto 3000 (tu front-end)
public class ApiDraftTesji {

    @Autowired
    ApiDraftService apiDraftService;

    @GetMapping("/get-prueba")
    public String getPrueba() {
        return "Funciona!! Bienvenido a API DRAFT TESJI";
    }

    @GetMapping("/ver-todos-jugadores")
    public ArrayList<DatosApiDraft> verTodosJugadores() {
        return apiDraftService.mostrarTodosJugadores();
    }

    @GetMapping("/ver-jugador/{idjugador}")
    public Optional<DatosApiDraft> verJugador(@PathVariable("idjugador") long id) {
        return apiDraftService.mostrarJugadorPorId(id);
    }

    @PostMapping("/registrar-jugador")
    public DatosApiDraft registrarJugador(@RequestBody DatosApiDraft jugador) {
        return apiDraftService.registrarJugador(jugador);
    }

    @PutMapping("/actualizar-jugador/{idjugador}")
    public DatosApiDraft actualizarJugador(@PathVariable("idjugador") long id, @RequestBody DatosApiDraft jugador) {
        // Verificar si el jugador existe antes de actualizarlo
        Optional<DatosApiDraft> jugadorExistente = apiDraftService.mostrarJugadorPorId(id);
        if (jugadorExistente.isPresent()) {
            jugador.setId(id); // Asignar el ID al jugador que se va a actualizar
            return apiDraftService.registrarJugador(jugador);
        } else {
            throw new RuntimeException("Jugador no encontrado con id: " + id);
        }
    }

    @DeleteMapping("/eliminar-jugador/{idjugador}")
    public Boolean eliminarJugador(@PathVariable("idjugador") long id) {
        return apiDraftService.borrarJugador(id);
    }
}
