import {useState} from "react"
import styles from "../styles/UserForm.module.css"
import { Typewriter } from "react-simple-typewriter"

const URL = "http://localhost:3001/usuarios/iniciar-sesion"

const Login = ({toggleForm}) => {

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
    console.log({formData})
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      })
      const data = await response.json()
      const {msg, datosUsuario} = data
      if(!response.ok) throw new Error(msg)
      localStorage.setItem("id", datosUsuario.id)
      localStorage.setItem("nombre", datosUsuario.nombre)
      console.log({data})
    } catch(error){
      console.log(error)
    }
    setFormData(initialFormData)
  }

  return (
    <div className={styles.contenedor}>
      <form onSubmit={handleSubmit}>
        <h1>Inicio de Sesion</h1>
        <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={formData.nombre}
            required
            placeholder="Nombre de usuario"
          />
        <input
            type="text"
            name="contrasena"
            onChange={handleChange}
            value={formData.contrasena}
            required
            placeholder="Contraseña123"
          />
        <p onClick={toggleForm}>
          Registrarse
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
  )
}

export default Login