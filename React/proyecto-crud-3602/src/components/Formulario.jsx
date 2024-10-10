import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:8080/api-draft';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [equipoActual, setEquipoActual] = useState('');
  const [costo, setCosto] = useState('');
  const [listaJugadores, setListaJugadores] = useState([]);
  const [editarForm, setEditarForm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await fetch(`${API_URL}/ver-todos-jugadores`);
        if (response.ok) {
          const data = await response.json();
          setListaJugadores(data);
        } else {
          throw new Error('Error al cargar los jugadores');
        }
      } catch (error) {
        console.error('Error:', error.message);
        Swal.fire('Error', error.message, 'error');
      }
    };
    fetchJugadores();
  }, []);

  const editarJugador = (objJugador) => {
    setEditarForm(true);
    setNombre(objJugador.nombreJugador);
    setEquipoActual(objJugador.equipoActual);
    setCosto(objJugador.costoCarta);
    setId(objJugador.id);
  };

  const validarCampos = () => {
    if (!nombre.trim() || !equipoActual.trim() || !costo.toString().trim()) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return false;
    }
    if (parseFloat(costo) < 0) {
      Swal.fire('Error', 'El costo debe ser igual o mayor a 0', 'error');
      return false;
    }
    return true;
  };

  const editarJugadorOK = async (evt) => {
    evt.preventDefault();
    if (!validarCampos()) return;
    
    Swal.fire({
      title: '¿Desea actualizar el jugador?',
      text: 'Esta acción no se puede revertir',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/actualizar-jugador/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreJugador: nombre, equipoActual: equipoActual, costoCarta: costo.toString() })
          });
          if (response.ok) {
            const jugadorEditado = { id, nombreJugador: nombre, equipoActual: equipoActual, costoCarta: costo.toString() };
            const nuevaLista = listaJugadores.map(jugador => (jugador.id === id ? jugadorEditado : jugador));
            setListaJugadores(nuevaLista);
            setEditarForm(false);
            setNombre('');
            setEquipoActual('');
            setCosto('');
            Swal.fire('Actualizado', 'Jugador actualizado correctamente', 'success');
          } else {
            throw new Error('Error al actualizar el jugador');
          }
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  const eliminarJugador = async (id) => {
    Swal.fire({
      title: '¿Desea eliminar el jugador?',
      text: 'Esta acción no se puede revertir',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/eliminar-jugador/${id}`, { method: 'DELETE' });
          if (response.ok) {
            const nuevaLista = listaJugadores.filter(jugador => jugador.id !== id);
            setListaJugadores(nuevaLista);
            Swal.fire('Eliminado', 'Jugador eliminado correctamente', 'success');
          } else {
            throw new Error('Error al eliminar el jugador');
          }
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  const registrarJugador = async (evt) => {
    evt.preventDefault();
    if (!validarCampos()) return;

    Swal.fire({
      title: '¿Desea registrar el jugador?',
      text: 'Esta acción no se puede revertir',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, registrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/registrar-jugador`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreJugador: nombre, equipoActual: equipoActual, costoCarta: costo.toString() })
          });
          if (response.ok) {
            const nuevoJugador = await response.json();
            setListaJugadores([...listaJugadores, nuevoJugador]);
            setNombre('');
            setEquipoActual('');
            setCosto('');
            Swal.fire('Registrado', 'Jugador registrado correctamente', 'success');
          } else {
            throw new Error('Error al registrar el jugador');
          }
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">DRAFT JUGADORES</h1>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <h2 className="text-center mb-4">Registro de Jugadores</h2>
          <form onSubmit={editarForm ? editarJugadorOK : registrarJugador}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del jugador"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Equipo actual del jugador"
                value={equipoActual}
                onChange={(e) => setEquipoActual(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Costo del jugador"
                value={costo}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0 || e.target.value === '') {
                    setCosto(e.target.value);
                  } else {
                    Swal.fire('Error', 'El costo debe ser igual o mayor a 0', 'error');
                  }
                }}
              />
            </div>
            <button className="btn btn-primary btn-block mb-3" type="submit">
              {editarForm ? 'Editar' : 'Registrar'}
            </button>
          </form>
        </div>
        <div className="col-lg-6">
          <h2 className="text-center mb-4">Lista de Jugadores</h2>
          <ul className="list-group">
            {listaJugadores.map((jugador) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={jugador.id}>
                <div>
                  <span className="lead">- Nombre Jugador: {jugador.nombreJugador}</span>
                  <br />
                  <small>- Equipo Actual: {jugador.equipoActual} - Costo: {jugador.costoCarta}</small>
                </div>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarJugador(jugador)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarJugador(jugador.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="mt-5 text-center">
        <p>By Angel Zarco</p>
      </footer>
    </div>
  );
};

export default Formulario;
