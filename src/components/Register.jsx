import {useState} from "react"
import styles from "../styles/UserForm.module.css"

const URL = "http://localhost:3001/usuarios/registrar"

const Register = () => {

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
    <form
      style={styles.form}
      onSubmit={handleSubmit}
    >
      <p>Registro</p>
      <input
        type="text"
        name="nombre"
        onChange={handleChange}
        value={formData.nombre}
        required
        minLength={4}
        placeholder="Nombre de usuario"
      />
      <input
        type="text"
        name="contrasena"
        onChange={handleChange}
        value={formData.contrasena}
        required
        minLength={8}
        placeholder="Contraseña123"
      />
      <button type="submit">ENVIAR</button>
    </form>
  )
}

export default Register