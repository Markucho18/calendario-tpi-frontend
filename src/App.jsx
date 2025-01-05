import { useState, useEffect } from "react"
import styles from "./styles/App.module.css"
import Register from "./components/Register"
import Login from "./components/Login"
import borrarDatosUsuario from "./utils/borrarDatosUsuario"
import PaginaPrincipal from "./components/PaginaPrincipal"
import ModalCrearEvento from "./components/ModalCrearEvento"
import ModalEditarEvento from "./components/ModalEditarEvento"
import { useModalesContext } from "./contexts/ModalesContext"

//const URL = "https://bicicleteria-tpi-backend.onrender.com"

const App = () => {

  const {modalCrearEvento, setModalCrearEvento, modalEditarEvento, cerrarModalEditarEvento} = useModalesContext(false)

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

  const cerrarSesion = async () => {
    try{
      const response = await fetch("http://localhost:3001/usuarios/cerrar-sesion", {
        method: "POST",
        credentials: "include"
      })
      const data = await response.json()
      console.log({data})
      borrarDatosUsuario()
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
      {modalCrearEvento && <ModalCrearEvento
        cerrarModal={() => setModalCrearEvento(false)}
      /> }
      {modalEditarEvento.abierto && <ModalEditarEvento
        datosEvento={modalEditarEvento.datos}
        cerrarModal={cerrarModalEditarEvento}
      /> }
      {tokenValido === true ? (
        <PaginaPrincipal/>
      ) : (
        <>
          {form === "login" && <Login
            toggleForm={toggleForm}
            activarToken={() => setTokenValido(true)}
          />}
          {form === "register" && <Register toggleForm={toggleForm}/>}
        </>
      )}
    </div>
  )
}

export default App