import {useState} from "react"
import styles from "../styles/UserForm.module.css"
import { Typewriter } from "react-simple-typewriter"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = "http://localhost:3001/usuarios/registrar"

const Register = ({toggleForm}) => {

  const initialFormData = {
    nombre: "",
    contrasena: "",
    confirmar_contrasena: ""
  }

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

  const validarDatos = (data) => {
    const {nombre, contrasena, confirmar_contrasena} = data
    const newErrors = []
    if(nombre.length === 0 || contrasena.length === 0 || confirmar_contrasena.length === 0) throw new Error("No pueden haber campos vacios")
    if(nombre.length <= 4) newErrors.push("El nombre no puede ser tan corto o estar vacio")
    if(contrasena.length < 8) newErrors.push("La contraseña debe tener almenos 8 caracteres")
    if(contrasena !== confirmar_contrasena) newErrors.push("La contraseñas no coinciden")
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const errores = validarDatos(formData)
      if(errores.length > 0) throw new Error(errores[0])
      const {confirmar_contrasena, ...newFormData} = formData
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newFormData),
      })
      if(response.status === 401) throw new Error("El nombre ya esta en uso")
      const data = await response.json()
      console.log({data})
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

  const [confirmarVisible, setConfirmarVisible] = useState(false)

  return (
    <>
      <div className={styles.contenedor}>
        <form onSubmit={handleSubmit}>
          <h1>Registrarse</h1>
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
          <label>
            <input
              type={confirmarVisible ? "text" : "password"}
              name="confirmar_contrasena"
              onChange={handleChange}
              value={formData.confirmar_contrasena}
              placeholder="Confirmar Contraseña"
            />
            <span
              className={styles.icono_ojo}
              onClick={() => setConfirmarVisible(prev => !prev)}
            >
              {confirmarVisible
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
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register