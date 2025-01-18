package com.zarco.apidraft.Model;      
//JPA utiliza esta clase para convertirla en una tabla de BD 
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jdk.jfr.Enabled;
 
@Entity
public class DatosApiDraft {
    //Definir los atributos, en este caso que seran los campos en la tabla
    @Id //Lo convierte en una PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Es autoincrementable
    private long id;
    private  String nombreJugador;
    private String equipoActual; 
    private  double costoCarta;
 
    public DatosApiDraft(){  
 
    }
    public DatosApiDraft(String nombreJugador, String equipoActual, double costoCarta) {
        this.nombreJugador = nombreJugador;
        this.equipoActual = equipoActual;
        this.costoCarta = costoCarta;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombreJugador() {
        return nombreJugador;
    }

    public void setNombreJugador(String nombreJugador) {
        this.nombreJugador = nombreJugador;
    }

    public String getEquipoActual() {
        return equipoActual;
    }

    public void setEquipoActual(String equipoActual) {
        this.equipoActual = equipoActual;
    }

    public double getCostoCarta() {
        return costoCarta;
    }

    public void setCostoCarta(double costoCarta) {
        this.costoCarta = costoCarta;
    }
}
