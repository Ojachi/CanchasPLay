import { useState, useEffect } from "react";
import "../css/main.css";
import { Link } from "react-router-dom";
import futbol1 from "../img/futbol1.jpg";
import futbol2 from "../img/futbol2.jpg";
import futbol3 from "../img/futbol3.jpg";
import voleibol1 from "../img/voleibol1.jpg";
import voleibol2 from "../img/voleibol2.jpg";
import voleibol3 from "../img/voleibol3.jpg";
import paintball1 from "../img/paintball1.jpg";
import paintball2 from "../img/paintball2.jpg";
import paintball3 from "../img/paintball3.jpg";

const Carrousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const widthImg = 100 / images.length;

  const moveToRight = () => {
    if (currentSlide >= images.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const moveToLeft = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(images.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(moveToRight, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="container-carousel1">
      <div
        className="carruseles"
        id="slider"
        style={{ transform: `translate(-${currentSlide * widthImg}%)` }}
      >
        {images.map((img, index) => (
          <section className="slider-section1" key={index}>
            <img src={img} alt={`Slide ${index + 1}`} />
          </section>
        ))}
      </div>

      <div className="btn-left" onClick={moveToLeft}>
        <i className="bx bx-chevron-left"></i>
      </div>
      <div className="btn-right" onClick={moveToRight}>
        <i className="bx bx-chevron-right"></i>
      </div>
      <Link to="../Reservar" className="reservarbutton">
        Reservar
      </Link>
    </div>
  );
};

const Canchas = () => {
  return (
    <div className="contenedorCanchas">
      <div className="sectionContainer">
        <h1 className="textoCan_1">Futbol</h1>
        <h3 className="textoCan">
          ¡Siente la emoción del fútbol en nuestra cancha de calidad
          profesional! Reserva tu espacio y disfruta de partidos llenos de
          acción en un entorno espectacular.
        </h3>
        <Carrousel images={[futbol1, futbol2, futbol3]} />
      </div>

      <div className="sectionContainer">
        <h1 className="textoCan1_1">Voleibol</h1>
        <h3 className="textoCan1">
          Nuestra cancha de voleibol te espera para partidos emocionantes.
          Experimenta la diversión y la competencia en un ambiente soleado y
          amigable. ¡Reserva ahora!
        </h3>
        <Carrousel images={[voleibol1, voleibol2, voleibol3]} />
      </div>

      <div className="sectionContainer">
        <h1 className="textoCan2_1">Paintball</h1>
        <h3 className="textoCan2">
          Reúne a tu equipo, elabora estrategias y sumérgete en una batalla
          llena de adrenalina. ¡Reserva tu experiencia hoy!
        </h3>
        <Carrousel images={[paintball1, paintball2, paintball3]} />
      </div>
    </div>
  );
};

export default Canchas;
