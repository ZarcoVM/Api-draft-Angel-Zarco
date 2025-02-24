package com.zarco.apidraft.Service; 
 
import com.zarco.apidraft.Model.DatosApiDraft;
  








import java.util.ArrayList;
import java.util.Optional;

// Define los métodos abstractos para cada end point
public interface ApiDraftService {
 
    ArrayList<DatosApiDraft> mostrarTodosJugadores();
    Optional<DatosApiDraft> mostrarJugadorPorId(long id);
    DatosApiDraft registrarJugador(DatosApiDraft jugador);
    boolean borrarJugador(long id);

}
  