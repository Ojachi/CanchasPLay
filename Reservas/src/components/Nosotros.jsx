import React from 'react'
import nosotros from '../img/pintballNosotros.jpg'
import { Link } from 'react-router-dom'

const Nosotros = () => {
  return (
    <div>
        <div  className='about-us'>
            <div className='containerAbout'>
                <div className='rowAbout'>
                    <div className='flex'>
                        <h2>Acerca de Nosotros</h2>
                        <h3>Nuestra Historia</h3>
                        <p>CanchasPlay nació del amor por el deporte y la diversión. Desde nuestro inicio en Neiva, Huila, hemos estado comprometidos con brindar oportunidades deportivas emocionantes a la comunidad local. Con canchas de fútbol, voleibol y escenarios de paintball, hemos creado un espacio para que amigos y familias disfruten juntos. <br /> En CanchasPlay, fomentamos un ambiente amigable y competitivo. Nuestro objetivo es que todos encuentren su pasión por el deporte y la camaradería. A lo largo de los años, hemos crecido y evolucionado, pero nuestra dedicación a la diversión y la actividad física nunca ha cambiado. <br />Unete a nosotros y sé parte de esta emocionante historia. ¡Te esperamos en CanchasPlay para vivir momentos inolvidables!</p>
                        <div className='social-links'>
                            <a href=""><i className='fa fa-facebook-f'></i></a>
                            <a href=""><i className='fa fa-twitter'></i></a>
                            <a href=""><i className='fa fa-instagram'></i></a>
                        </div>
                        <Link to="Reservar" className='btn'>Reservar Ya!</Link>
                    </div>
                    <div className='flex'>
                        <img src={nosotros} alt="imagen" />
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Nosotros