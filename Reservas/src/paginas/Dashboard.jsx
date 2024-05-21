import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import 'foundation-sites/dist/css/foundation.min.css';
import Modal from 'react-modal';
import { SessionContext } from "../components/Session";
import EditarReserva from '../components/EditarReserva';
import {  useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from 'react-icons/fa';

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

const Dashboard = () => {
  const { session } = useContext(SessionContext);
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [serverResponse, setServerResponse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      if (!session || !session.esAdmin) {
        setTimeout(() => {
          navigate("/"); 
        }, 5000);
      }
    };

    checkAdmin();

    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/reservas/admin');
        setReservas(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCanchas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/canchas');
        setCanchas(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (session && session.esAdmin) {
      fetchReservas();
      fetchUsuarios();
      fetchCanchas();
    }
  }, [session, history]);

  const openModal = (type, reserva = null, cancha = null) => {
    setModalType(type);
    setSelectedReserva(reserva);
    setSelectedCancha(cancha);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteReserva = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/reservas/${selectedReserva._id}`);
      setReservas(reservas.filter(reserva => reserva._id !== selectedReserva._id));
      setServerResponse('Reserva eliminada correctamente.');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    await fetchReservas();
  };

  const fetchReservas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/reservas/admin');
      setReservas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCancha = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/canchas/${selectedCancha._id}`);
      setCanchas(canchas.filter(cancha => cancha._id !== selectedCancha._id));
      setServerResponse('Cancha eliminada correctamente.');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleServerResponse = (message) => {
    setServerResponse(message);
  };

  if (!session || !session.esAdmin) {
    return (
      <div className="access-denied">
        <FaExclamationTriangle className="icon" />
        <h1>Acceso Denegado</h1>
        <p>No tiene acceso a este lugar. Será redirigido a la página principal en 5 segundos.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-canchas">
        <h1>Canchas</h1>
        <table className="hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {canchas.map((cancha, index) => (
              <tr key={cancha._id}>
                <td>{index + 1}</td>
                <td>{cancha.tipo_cancha}</td>
                <td>{cancha.descripcion}</td>
                <td>
                  <button className="button alert" onClick={() => openModal('deleteCancha', null, cancha)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dashboard-reservas">
        <h1>Reservas</h1>
        <table className="hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha y Hora</th>
              <th>Duración</th>
              <th>Cliente</th>
              <th>Cancha</th>
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
                <td>{reserva.cliente.nombre}</td>
                <td>{reserva.cancha.tipo_cancha}</td>
                <td>{reserva.telefono}</td>
                <td>
                  <button className="button warning" onClick={() => openModal('editReserva', reserva)}>Editar</button>
                  <button className="button alert" onClick={() => openModal('deleteReserva', reserva)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dashboard-usuarios">
        <h1>Usuarios</h1>
        <table className="hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={usuario._id}>
                <td>{index + 1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Modal"
      >
        {modalType === 'deleteReserva' && (
          <>
            <h2>Confirmar Eliminación</h2>
            <p>¿Está seguro de que desea eliminar esta reserva?</p>
            <button className="button alert" onClick={handleDeleteReserva}>Eliminar</button>
            <button className="button" onClick={closeModal}>Cancelar</button>
          </>
        )}
        {modalType === 'editReserva' && (
          <EditarReserva
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            reserva={selectedReserva}
            onSave={handleSave}
            onResponse={handleServerResponse}
          />
        )}
        {modalType === 'deleteCancha' && (
          <>
            <h2>Confirmar Eliminación</h2>
            <p>¿Está seguro de que desea eliminar esta cancha?</p>
            <button className="button alert" onClick={handleDeleteCancha}>Eliminar</button>
            <button className="button" onClick={closeModal}>Cancelar</button>
          </>
        )}
      </Modal>

      {serverResponse && (
        <Modal
          isOpen={!!serverResponse}
          onRequestClose={() => setServerResponse('')}
          style={customModalStyles}
          contentLabel="Respuesta del Servidor"
        >
          <h2>Mensaje</h2>
          <p>{serverResponse}</p>
          <button onClick={() => setServerResponse('')}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
