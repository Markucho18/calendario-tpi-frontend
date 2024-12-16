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
      if(response.status === 401) throw new Error("Debes iniciar sesion de nuevo")
      if(response.status === 403) throw new Error(`El ${data.tipo}Token es invalido`)
      setTokenValido(true)
      console.log({response, data})
    } catch(error){
      if(error instanceof Error) alert(error.message)
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

  const [form, setForm] = useState("login")
  const toggleForm = () => {
    if(form === "login") setForm("register")
    else setForm("login")
  }

  return (
    <div className={styles.App}>
      {tokenValido === true ? (
        <Eventos />
      ) : (
        <>
          {form === "login" && <Login toggleForm={toggleForm}/>}
          {form === "register" && <Register toggleForm={toggleForm}/>}
        </>
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