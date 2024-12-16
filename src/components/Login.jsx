import {useState} from "react"
import styles from "../styles/UserForm.module.css"

const URL = "http://localhost:3001/usuarios/iniciar-sesion"

const Login = () => {

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
      if(!response.ok) throw new Error(data.msg)
      console.log({data})
    } catch(error){
      console.log(error)
    }
    setFormData(initialFormData)
  }

  return (
    <form
      style={styles.form}
      onSubmit={handleSubmit}
    >
      <p>Inicio de Sesion</p>
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
      <button type="submit">ENVIAR</button>
    </form>
  )
}

export default Login