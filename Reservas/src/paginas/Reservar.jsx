import { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import '../css/main.css';
import Modal from 'react-modal';
import moment from 'moment';
import CustomTimePicker from '../components/selectFecha';
import CustomTimePicker2 from '../components/selectHoraFin';
import axios from 'axios';
import { SessionContext } from "../components/Session";

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#333',
    color: '#fff',
    borderRadius: '8px',
    maxWidth: '300px',
  },
};

Modal.setAppElement('#root');

const Reservar = () => {
  const { session } = useContext(SessionContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('none'); 
  const [tipoVisible, setTipoVisible] = useState(false);
  const [Hora1Visible, setHora1Visible] = useState(false); 
  const [Hora2Visible, setHora2Visible] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [deporte, setDeporte] = useState('any');
  const [tipo, setTipo] = useState('none');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [reservaExitosa, setReservaExitosa] = useState(false);

  const handleChange = (newTime) => {
    setTime(newTime);
  };

  const handleDeporteChange = (e) => {
    setDeporte(e.target.value);
    if (e.target.value === 'Futbol') {
      setTipoVisible(true);
    } else {
      setTipoVisible(false);
      setTipo('none');
    }
  };

  const handleHora = (e) => {
    const value = e.target.value;
    setTime(value);
    if (value === '1') {
      setHora1Visible(true);
      setHora2Visible(false);
    } else if (value === '2') {
      setHora1Visible(false);
      setHora2Visible(true);
    } else {
      setHora1Visible(false);
      setHora2Visible(false);
      setTipo('none');
    }
  };

  const handleReservar = async (e) => {
    e.preventDefault();
    if (
      !telefono ||
      !selectedDate ||
      !time ||
      telefono.length !== 10
    ) {
      setModalMessage('Por favor, complete todos los campos y asegúrese de ingresar un número de teléfono válido de 10 dígitos.');
      setModalVisible(true);
    } else {
      const fechaSeleccionada = moment(selectedDate);
      const ahora = moment();

      if (fechaSeleccionada.isBefore(ahora, 'day')) {
        setModalMessage('Por favor, elija una fecha y hora válida.');
        setModalVisible(true);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/reservas",
            { 
              telefono, 
              fecha_hora: selectedDate, 
              duracion: 2,
              cliente: session.nombre,
              cancha: deporte, // Pasar el nombre de usuario desde el contexto de sesión
            }
          );

          // Restablecer los valores del formulario después de una reserva exitosa
          setTelefono('');
          setDeporte('any');
          setTipo('none');
          setSelectedDate(null);
          setTime('');
          setModalMessage(response.data.message || 'Reserva creada exitosamente.');
          setReservaExitosa(true);
          setModalVisible(true);
        } catch (error) {
          setModalMessage('Error al registrar la reserva.');
          setModalVisible(true);
        }
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="contenedor">
      <br />
      <div className="translucent-form-overlay">
        <form>
          <h3>Reservas</h3>
          <div className="row columns">
            <label>Teléfono
              <input
                type="number"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </label>
          </div>
          <div className="row columns">
            <label>Deporte
              <select
                name="deporte"
                type="text"
                value={deporte}
                onChange={handleDeporteChange}
              >
                <option value="none">Seleccionar</option>
                <option value="Futbol">Futbol</option>
                <option value="Voleibol">Voleibol</option>
                <option value="Paintball">Paintball</option>
              </select>
            </label>
          </div>
          {tipoVisible && (
            <div className="row columns">
              <label>Tipo
                <select
                  name="tipo"
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="none">Select</option>
                  <option value="Futbol 5">Futbol 5</option>
                  <option value="Futbol 8">Futbol 8</option>
                  <option value="Futbol 11">Futbol 11</option>
                </select>
              </label>
            </div>
          )}
          <div className="row columns">
            <label className="columns small-12">Fecha</label>
            <div className="columns">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Fecha"
              />
            </div>
          </div>
          <div className="row columns">
            <label className="columns small-12">Tiempo de reserva</label>
            <select
              className='columns1'
              name="hora"
              type="text"
              onChange={handleHora}
            >
              <option value="none">seleccionar</option>
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
            </select>
            <div className="columns1">
              {Hora1Visible && <CustomTimePicker value={time} onChange={handleChange} />}
              {Hora2Visible && <CustomTimePicker2 value={time} onChange={handleChange} />}
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
      <br />
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
