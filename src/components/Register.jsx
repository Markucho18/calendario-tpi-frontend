import {useState} from "react"
import styles from "../styles/UserForm.module.css"
import { Typewriter } from "react-simple-typewriter"

const URL = "http://localhost:3001/usuarios/registrar"

const Register = ({toggleForm}) => {

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
    try{
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log({data})
    } catch(error){
      console.log(error)
    }
    console.log({formData})
    setFormData(initialFormData)
  }

  return (
    <div className={styles.contenedor}>
      <form onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
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
        <input
            type="text"
            name="contrasena"
            onChange={handleChange}
            value={formData.contrasena}
            required
            placeholder="Contraseña123"
          />
        <p onClick={toggleForm}>
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
  )
}

export default Register