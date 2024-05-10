import "../css/main.css";
import { Outlet, Link } from "react-router-dom";
import logo from "../img/logo.png";
import { useContext } from "react";
import { SessionContext } from "../components/Session";

const NavBar = () => {
  const { session, setSession } = useContext(SessionContext);
  const login = () => {
    if (!session || Object.keys(session).length === 0) {
      return (
        <Link to="InicioSesion">
          <i className="fas fa-lock" />
        </Link>
      );
    } else {
      return (
        <div className="dropdown">
          <button className="dropbtn">
            <i className="fas fa-user" />
          </button>
          <div className="dropdown-content">
            <Link to="#" onClick={() => setSession({})}>
              Log out
            </Link>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div data-sticky-container>
        <div
          data-sticky
          data-margin-top="0"
          data-top-anchor="header:bottom"
          data-btm-anchor="content:bottom"
        >
          <div className="top-bar topbar-sticky-shrink">
            <div className="top-bar-title">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="Canchas">Canchas</Link>
                </li>
                <li>
                  <Link to="Reservar">Reservar</Link>
                </li>
                <li>
                  <Link to="Nosotros">Nosotros</Link>
                </li>
                <li>{login()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
      <footer className="marketing-site-footer">
        <div className="row medium-unstack">
          <div className="medium-4 columns">
            <h4 className="marketing-site-footer-name">CanchasPlay</h4>
            <p>
              Pasa un buen rato en en compañia con tus amigos, llama para
              resrvar tu cancha de futbol o de tejo.
            </p>
            <br />
            <ul className="menu marketing-site-footer-menu-social simple">
              <li>
                <a href="#">
                  <i className="fa fa-instagram " aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <br />
            <p className="Derechos">&copy; 2023 Derechos reservados</p>
          </div>
          <div className="medium-4 columns">
            <h4 className="marketing-site-footer-title">
              Informacion de contacto
            </h4>
            <div className="marketing-site-footer-block">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <p>
                Calle 1c #23-60
                <br />
                Neiva, Acacias 1
              </p>
            </div>
            <div className="marketing-site-footer-block">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <p>+57 (318) 388-6495</p>
            </div>
            <div className="marketing-site-footer-block">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <p>CanchaPlay@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NavBar;
