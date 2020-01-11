import React, { useState, useEffect } from "react";

function Cita({ cita, index, eliminarCita }) {
  return (
    <div className="cita">
      <p>
        Mascota: <span>{cita.mascota}</span>
      </p>
      <p>
        Propietario: <span>{cita.propietario}</span>
      </p>
      <p>
        Fecha: <span>{cita.fecha}</span>
      </p>
      <p>
        Hora: <span>{cita.hora}</span>
      </p>
      <p>
        Sintomas: <span>{cita.sintomas}</span>
      </p>
      <button
        onClick={() => eliminarCita(index)}
        type="button"
        className="button eliminar u-full-width"
      >
        Eliminar
      </button>
    </div>
  );
}

function Formulario(props) {
  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  };

  const [cita, actualizarCita] = useState(stateInicial);

  const actualizarState = e => {
    console.log(e.target.name);
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const enviarCita = e => {
    e.preventDefault();

    // Pasar la cita hacia el componente principal
    props.crearCita(cita);

    // REiniciar el state
    actualizarCita(stateInicial);
  };

  return (
    <React.Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={enviarCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={actualizarState}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </React.Fragment>
  );
}

function App() {
  // cargar las citas iniciales de localstorage como stateInicial
  let citasIniciales2 = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales2) {
    citasIniciales2 = [];
  }

  // useState retorna dos funciones
  const [citas, guardarCita] = useState(citasIniciales2);

  // Agregar las nuevas citas al state
  const crearCita = cita => {
    const nuevasCitas = [...citas, cita];
    //almacenar la nueva cita
    guardarCita(nuevasCitas);
  };

  // Elimina las citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  };

  useEffect(() => {
    console.log("Componente listo o algo cambio");
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  // Cargar titulo condicionalmente
  // Objet.keys retorna las posiciones
  const titulo =
    Object.keys(citas).length === 0
      ? "No hay citas"
      : "Administrar las citas aqui";

  return (
    <React.Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="one-half column">
          <Formulario crearCita={crearCita} />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map((cita, index) => (
            <Cita
              key={index}
              index={index}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
