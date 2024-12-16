import { useState, useEffect } from "react"
import styles from "./styles/App.module.css"
import Register from "./components/Register"
import Login from "./components/Login"
import Eventos from "./components/Eventos"

//const URL = "https://bicicleteria-tpi-backend.onrender.com"
const URL = "http://localhost:3001/"

const App = () => {

  const [tokenValido, setTokenValido] = useState(false)

  const validarToken = async () => {
    try{
      const response = await fetch("http://localhost:3001/usuarios/validar-token", {
        method: "POST",
        credentials: "include"
      })
      const data = await response.json()
      setTokenValido(true)
      console.log({data})
    } catch(error){
      setTokenValido(false)
    }
  }

  const peticionEventos = async () => {
    try{
      const response = await fetch("http://localhost:3001/eventos", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      console.log({data})
    } catch(error){
      console.log(error)
    }
  }

  const cerrarSesion = async () => {
    try{
      const response = await fetch("http://localhost:3001/usuarios/cerrar-sesion", {
        method: "POST",
        credentials: "include"
      })
      const data = await response.json()
      console.log({data})
      await validarToken()
    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    validarToken()
  },[])

  useEffect(()=>{
    console.log({tokenValido})
  },[tokenValido])

  return (
    <div className={styles.App}>
      {validarToken === true ? (
        <Eventos />
      ) : (
        <div className={styles.contenedor_forms}>
          <Login />
          <Register />
        </div>
      )}
      <div className={styles.contenedor_forms}>
        <button
          style={styles.button}
          onClick={cerrarSesion}
        >
          CERRAR SESION
        </button>
        <button
          style={styles.button}
          onClick={validarToken}
        >
          VALIDARTOKEN
        </button>
        <button
          style={styles.button}
          onClick={peticionEventos}
        >
          OBTENER EVENTOS
        </button>
      </div>
    </div>
  )
}

export default App