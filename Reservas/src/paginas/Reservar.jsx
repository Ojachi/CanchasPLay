import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { SessionContext } from "../components/Session";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import EditarReserva from "../components/EditarReserva"; // Importar el componente EditarReserva

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#333",
    color: "#fff",
    borderRadius: "8px",
    maxWidth: "300px",
  },
};

Modal.setAppElement("#root");

const Reservar = () => {
  const { session } = useContext(SessionContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("none");
  const [telefono, setTelefono] = useState("");
  const [deporte, setDeporte] = useState("any");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showReservas, setShowReservas] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [loginModalVisible, setLoginModalVisible] = useState(false); // Nuevo estado para el modal de login

  const fetchReservas = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reservas`, {
        params: { cliente: session.id },
      });
      setReservas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCanchas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/canchas");
      setCanchas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session.id) {
      fetchReservas();
    }
    fetchCanchas();
  }, [session.id]);

  const handleChange = (newTime) => {
    setTime(newTime);
  };


  const handleReservar = async (e) => {
    e.preventDefault();
    if (!telefono || !selectedDate || !time || telefono.length !== 10) {
      setModalMessage(
        "Por favor, complete todos los campos y asegúrese de ingresar un número de teléfono válido de 10 dígitos."
      );
      setModalVisible(true);
    } else {
      const fechaSeleccionada = moment(selectedDate);
      const ahora = moment();

      if (fechaSeleccionada.isBefore(ahora, "day")) {
        setModalMessage("Por favor, elija una fecha y hora válida.");
        setModalVisible(true);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/reservas",
            {
              telefono,
              fecha_hora: selectedDate,
              duracion: time,
              cliente: session.id,
              cancha: deporte,
            }
          );

          // Restablecer los valores del formulario después de una reserva exitosa
          setTelefono("");
          setDeporte("any");
          setSelectedDate(null);
          setTime("");
          setModalMessage(
            response.data.message || "Reserva creada exitosamente."
          );
          setModalVisible(true);

          // Volver a cargar las reservas desde el backend para asegurarse de que los datos estén actualizados
          fetchReservas();

        } catch (error) {
          setModalMessage("Error al registrar la reserva.");
          setModalVisible(true);
        }
      }
    }
  };

  const toggleReservas = () => {
    if (!session.id) {
      setLoginModalVisible(true); // Mostrar el modal de login si no ha iniciado sesión
    } else {
      setShowReservas(!showReservas);
    }
  };

  const handleDeleteReserva = async (reservaId) => {
    try {
      await axios.delete(`http://localhost:4000/api/reservas/${reservaId}`);
      setReservas(reservas.filter((reserva) => reserva._id !== reservaId));
      setModalMessage("Reserva eliminada correctamente.");
      setModalVisible(true);
    } catch (error) {
      setModalMessage("Error al eliminar la reserva.");
      setModalVisible(true);
    }
  };

  const handleEditReserva = (reserva) => {
    setSelectedReserva(reserva);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const handleSave = async () => {
    await fetchReservas();
  };

  const handleServerResponse = (message) => {
    setServerResponse(message);
  };

  const closeResponseModal = () => {
    setServerResponse("");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  return (
    <div className="reservar-container">
      <button
        className="button primary"
        onClick={toggleReservas}
        style={{ margin: "20px" }}
      >
        {showReservas ? "Reservar" : "Mostrar Reservas"}
      </button>
      {!showReservas ? (
        <div className="translucent-form-overlay">
          <form>
            <h3>Reservas</h3>
            {!session.id && (
              <p style={{ color: 'red' }}>Inicie sesión para reservar</p>
            )}
            <div className="row columns">
              <label>
                Teléfono
                <input
                  type="number"
                  name="telefono"
                  placeholder="Numero"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={!session.id} // Deshabilitar si no ha iniciado sesión
                />
              </label>
            </div>
            <div className="row columns">
              <label>
                Deporte
                <select
                  name="deporte"
                  type="text"
                  value={deporte}
                  onChange={(e) => setDeporte(e.target.value)}
                  disabled={!session.id} // Deshabilitar si no ha iniciado sesión
                >
                  <option value="none">Seleccionar</option>
                  {canchas.map((cancha) => (
                    <option key={cancha._id} value={cancha._id}>
                      {cancha.tipo_cancha}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="row columns">
              <label className="columns small-12">Fecha</label>
              <div className="columns">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Fecha"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
                  disabled={!session.id} // Deshabilitar si no ha iniciado sesión
                />
              </div>
            </div>
            <div className="row columns">
              <label className="columns small-12">Tiempo de reserva</label>
              <select
                className="columns1"
                name="hora"
                type="text"
                onChange={(e) => handleChange(e.target.value)}
                value={time}
                disabled={!session.id} // Deshabilitar si no ha iniciado sesión
              >
                <option value="none">Seleccionar</option>
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
              </select>
            </div>
            <button
              type="button"
              className="primary button expanded search-button"
              onClick={handleReservar}
              disabled={!session.id} // Deshabilitar si no ha iniciado sesión
            >
              Reservar
            </button>
          </form>
        </div>
      ) : (
        <div className="reservas-list">
          <h3>Mis Reservas</h3>
          <table className="hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha y Hora</th>
                <th>Duración</th>
                <th>Deporte</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, index) => (
                <tr key={reserva._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(reserva.fecha_hora).toLocaleString()}</td>
                  <td>{reserva.duracion}</td>
                  <td>{reserva.cancha.tipo_cancha}</td>
                  <td>{reserva.telefono}</td>
                  <td>
                    <button
                      className="button warning"
                      onClick={() => handleEditReserva(reserva)}
                    >
                      Editar
                    </button>
                    <button
                      className="button alert"
                      onClick={() => handleDeleteReserva(reserva._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        isOpen={modalVisible}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Mensaje del servidor"
      >
        <h2>Mensaje</h2>
        <p>{modalMessage}</p>
      </Modal>
      
      <EditarReserva
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        reserva={selectedReserva}
        onSave={handleSave}
        onResponse={handleServerResponse}
      />
      <Modal
        isOpen={!!serverResponse}
        onRequestClose={closeResponseModal}
        style={customModalStyles}
        contentLabel="Respuesta del Servidor"
      >
        <h2>Mensaje</h2>
        <p>{serverResponse}</p>
        <button onClick={closeResponseModal}>Cerrar</button>
      </Modal>
      <Modal
        isOpen={loginModalVisible}
        onRequestClose={closeLoginModal}
        style={customModalStyles}
        contentLabel="Iniciar Sesión"
      >
        <h2>Iniciar Sesión</h2>
        <p>Debe iniciar sesión para ver sus reservas.</p>
        <button onClick={closeLoginModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Reservar;
