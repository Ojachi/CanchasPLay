import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

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

const EditarReserva = ({ isOpen, onRequestClose, reserva, onSave, onResponse }) => {
  const [formValues, setFormValues] = useState({
    fecha_hora: new Date(),
    duracion: '',
    cancha: '',
  });
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/canchas');
        setCanchas(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCanchas();

    if (reserva) {
      setFormValues({
        fecha_hora: new Date(reserva.fecha_hora),
        duracion: reserva.duracion,
        cancha: reserva.cancha._id,
      });
    }
  }, [reserva]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedReserva = {
        fecha_hora: formValues.fecha_hora,
        duracion: formValues.duracion,
        cancha: formValues.cancha,
      };

      const response = await axios.put(`http://localhost:4000/api/reservas/${reserva._id}`, updatedReserva);

      onSave();
      onRequestClose();
      onResponse(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="Editar Reserva"
    >
      <h2>Editar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha y Hora
          <DatePicker
            selected={formValues.fecha_hora}
            onChange={(date) => setFormValues({ ...formValues, fecha_hora: date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
          />
        </label>
        <label>Duración
          <input
            type="number"
            name="duracion"
            value={formValues.duracion}
            onChange={handleInputChange}
          />
        </label>
        <label>Cancha
          <select
            name="cancha"
            value={formValues.cancha}
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccionar</option>
            {canchas.map((cancha) => (
              <option key={cancha._id} value={cancha._id}>
                {cancha.tipo_cancha}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="button">Guardar</button>
        <button type="button" className="button" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default EditarReserva;
