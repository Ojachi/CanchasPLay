import NavBar from './components/NavBar'
import Inicio from './components/Inicio'
import Canchas from './components/Canchas'
import Reservar from './components/Reservar'
import Nosotros from './components/Nosotros'
import { Routes, Route } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import SignUp from './components/SignUp'
import InicioSesion from './components/InicioSesion'

function App() {

  return (
    
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route path='Inicio' element={<Inicio/>}/>
          <Route path='Canchas' element={<Canchas/>}/>
          <Route path='Reservar' element={<Reservar/>}/>
          <Route path='Nosotros' element={<Nosotros/>}/>
          <Route path='InicioSesion' element={<InicioSesion/>}/>
          <Route path='SignUp' element={<SignUp/>}/>
        </Route>
      </Routes>
    
  )
}

export default App
