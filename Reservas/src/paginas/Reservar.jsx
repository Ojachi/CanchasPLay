import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { SessionContext } from "../components/Session";
import Modal from "react-modal";
import moment from "moment";
import CustomTimePicker from "../components/selectFecha";
import CustomTimePicker2 from "../components/selectHoraFin";

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
  const [timeStart, setTimeStart] = useState("none");
  const [Hora1Visible, setHora1Visible] = useState(false);
  const [Hora2Visible, setHora2Visible] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [deporte, setDeporte] = useState("any");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [showReservas, setShowReservas] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]); // Nuevo estado para las canchas

  console.log(session);
  useEffect(() => {
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

    fetchReservas();
    fetchCanchas(); // Llamar a fetchCanchas para obtener las canchas
  }, [session.usuarioId]);

  const handleChange = (newTime) => {
    setTime(newTime);
  };

  const handleHora = (e) => {
    const value = e.target.value;
    setTimeStart(value);
    if (value === "1") {
      setHora1Visible(true);
      setHora2Visible(false);
    } else if (value === "2") {
      setHora1Visible(false);
      setHora2Visible(true);
    } else {
      setHora1Visible(false);
      setHora2Visible(false);
    }
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
              duracion: 2,
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
          setReservaExitosa(true);
          setModalVisible(true);

          // Actualizar las reservas
          const updatedReservas = await axios.get(
            `http://localhost:4000/api/reservas`,
            {
              params: { cliente: session.usuarioId },
            }
          );
          setReservas(updatedReservas.data);
        } catch (error) {
          setModalMessage("Error al registrar la reserva.");
          setModalVisible(true);
        }
      }
    }
  };

  const toggleReservas = () => {
    setShowReservas(!showReservas);
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
    setModalMessage("Funcionalidad de edición en construcción.");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
            <div className="row columns">
              <label>
                Teléfono
                <input
                  type="number"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
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
                  dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSXXX" // Formato ISO 8601
                />
              </div>
            </div>
            <div className="row columns">
              <label className="columns small-12">Tiempo de reserva</label>
              <select
                className="columns1"
                name="hora"
                type="text"
                onChange={handleHora}
                value={time}
              >
                <option value="none">Seleccionar</option>
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
              </select>
              <div className="columns1">
                {Hora1Visible && (
                  <CustomTimePicker value={timeStart} onChange={handleChange} />
                )}
                {Hora2Visible && (
                  <CustomTimePicker2
                    value={timeStart}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
            <button
              type="button"
              className="primary button expanded search-button"
              onClick={handleReservar}
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
                  <td>{reserva.cancha}</td>
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
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
      <Modal
        isOpen={reservaExitosa}
        onRequestClose={() => setReservaExitosa(false)}
        style={customModalStyles}
        contentLabel="Reserva Exitosa Modal"
      >
        <h2>Reserva Exitosa</h2>
        <button onClick={() => setReservaExitosa(false)}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Reservar;
