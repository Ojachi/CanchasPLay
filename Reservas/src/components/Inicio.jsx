import futbol from '../img/1.png'
import voleibol from '../img/2.png'
import paintbal from '../img/3.png'
import fut from '../img/futbo.png'
import vol from '../img/vole.png'
import pai from '../img/pint.png'
import '../css/main.css'
import React, {useState, useEffect} from 'react'



const Inicio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderSection = [futbol, voleibol, paintbal];

  const widthImg = 100 / sliderSection.length;

  const moveToRight = () => {
    if (currentSlide >= sliderSection.length - 1) {
      setCurrentSlide(0);
      return;
    }
    setCurrentSlide(currentSlide + 1);
  };

  const moveToLeft = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(sliderSection.length - 1);
      return;
    }
    setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    const interval = setInterval(moveToRight, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div>
        <div className="container-carousel">
          <div className="carruseles" id="slider" style={{ transform: `translate(-${currentSlide * widthImg}%)` }}>
            {sliderSection.map((img, index) => (
              <section className="slider-section" key={index}>
                <img src={img} alt={`Slide ${index + 1}`} />
              </section>
            ))}
          </div>
          <div className="btn-left" onClick={moveToLeft}>
            <i className='bx bx-chevron-left'></i>
          </div>
          <div className="btn-right" onClick={moveToRight}>
            <i className='bx bx-chevron-right'></i>
          </div>
        </div>

        
        <section className="marketing-site-three-up">
            <div className="rown medium-unstack">
                <div className="columns">
                    <img className='logoInicio' src={pai} alt="Pintball" />
                    <h4 className="marketing-site-three-up-title">Paintball</h4>
                    <br />
                    <p className="marketing-site-three-up-desc">¡Experimenta la adrenalina en nuestra cancha de paintball! Reserva tu espacio y prepárate para una batalla llena de estrategia y emoción. Atrévete a vivir una experiencia única en un campo de paintball diseñado para la diversión extrema.</p>
                </div>
                <div className="columns">
                    <img className='logoInicio' src={fut} alt="Futbol" />
                    <h4 className="marketing-site-three-up-title">Fútbol</h4>
                    <br />
                    <p className="marketing-site-three-up-desc">Reserva nuestra cancha de fútbol y disfruta de partidos emocionantes con tus amigos. Ya sea un juego casual o un torneo, ¡nuestra cancha es perfecta para que vivas la pasión del fútbol!</p>
                </div>
                <div className="columns">
                    <img className='logoInicio' src={vol} alt="voleibol" />
                    <h4 className="marketing-site-three-up-title">Voleibol</h4>
                    <br />
                    <p className="marketing-site-three-up-desc">Ven a disfrutar del voleibol en nuestra cancha. Reúne a tu equipo y disfruta de partidos emocionantes. Nuestra cancha te ofrece el espacio perfecto para competir y divertirte.</p>
                </div>
            </div>
        </section>
        
    </div>
  )
}

export default Inicio