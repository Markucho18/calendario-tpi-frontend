import {useState} from "react"
import styles from "../styles/UserForm.module.css"
import { Typewriter } from "react-simple-typewriter"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = "http://localhost:3001/usuarios/iniciar-sesion"

const Login = ({toggleForm, activarToken}) => {

  const initialFormData = {nombre: "", contrasena: ""}

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {nombre, contrasena} = formData
      if(nombre.length === 0 || contrasena.length === 0) throw new Error("No pueden haber campos vacios")
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      })
      if(response.status === 404) throw new Error("El usuario no existe")
      if(response.status === 401) throw new Error("La contraseña no coincide")
      const data = await response.json()
      const {msg, datosUsuario} = data
      if(!response.ok) throw new Error(msg)
      localStorage.setItem("id", datosUsuario.id)
      localStorage.setItem("nombre", datosUsuario.nombre)
      console.log({data})
      activarToken()
      setFormData(initialFormData)
    } catch(error){
      toast(error.message ?? "Ocurrio un error", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        style:{
          color: "red"
        }
      });
    }
  }

  const [contrasenaVisible, setContrasenaVisible] = useState(false)

  return (
   <>
     <div className={styles.contenedor}>
        <form onSubmit={handleSubmit}>
          <h1>Inicio de Sesion</h1>
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={formData.nombre}
            placeholder="Nombre de usuario"
          />
          <label>
            <input
              type={contrasenaVisible ? "text" : "password"}
              name="contrasena"
              onChange={handleChange}
              value={formData.contrasena}
              placeholder="Contraseña"
            />
            <span
              className={styles.icono_ojo}
              onClick={() => setContrasenaVisible(prev => !prev)}
            >
              {contrasenaVisible
                ? <FaEye/>
                : <FaEyeSlash />
              }
            </span>
          </label>
          <p className={styles.toggle} onClick={toggleForm}>
            Iniciar Sesion
          </p>
          <button type="submit">ENVIAR</button>
        </form>
        <section>
          <p className={styles.titulo}>
            <Typewriter
              words={['Calendario TPI']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <p className={styles.subtitulo}>
            <Typewriter
                words={['Por Tobias Zambrano']}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
            />
          </p>
          <div className={styles.info}>
            <p>Colegio Tecnico Provincial Olga B de Arko</p>
            <p>ReactJS - Nodejs - Express - SQL - JavaScript - CSS</p>
            <p>(Ahi deberia de poner iconos quiza)</p>
          </div>
        </section>
      </div>
      <ToastContainer />
   </>
  )
}

export default Login