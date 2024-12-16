import { useState, useEffect } from "react"
import { RiDeleteBinLine } from "react-icons/ri";

const Eventos = () => {

  const [eventos, setEventos] = useState([])

  const obtenerEventos = async () => {
    try{
      const response = await fetch("http://localhost:3001/eventos", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      setEventos(data.rows)
      console.log({data})
    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    obtenerEventos()
  },[])

  const formatearHora = (horaCompleta) => {
    const hora = horaCompleta.split(":")[0]
    const minutos = horaCompleta.split(":")[1]
    const horaFormateada = hora < 10 ? `0${hora}` : hora
    return`${horaFormateada}:${minutos}`
  }

  const initialFormData = {
    nombre: "",
    fecha: (new Date()).toISOString().split('T')[0],
    hora_inicio: formatearHora((new Date()).toLocaleTimeString()),
    hora_final: formatearHora((new Date()).toLocaleTimeString()),
    descripcion: "",
    categoria: ""
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

  const handleSubmit = async (e) => {
   try{
    e.preventDefault()
    const id_usuario = localStorage.getItem("id") ?? null
    if(id_usuario === null) throw new Error("No se encontro el id_usuario")
    const response = await fetch("http://localhost:3001/eventos/crear", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({...formData, id_usuario})
    })
    const data = await response.json()
    setEventos(prev => {
      return [...prev, {...formData, id_usuario}]
    })
    console.log({data})
   } catch(error){
    console.log(error.message ?? "Hubo un error")
   }
  }
  
  const borrarEvento = async (id) => {
    try{
      const response = await fetch(`http://localhost:3001/eventos/borrar/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await response.json()
      if(!response.ok) throw new Error(data.msg ?? "Hubo un error")
      const nuevosEventos = eventos.filter(evento => evento.id !== id)
      setEventos(nuevosEventos)
      console.log({data})
    } catch(error){
      console.log(error.message ?? "Hubo un error")
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "2rem"
    }}>
      <ul>
        {eventos.length > 0 ? eventos.map((evento, i)=>(
          <li
            key={i}
          >
            <p>{evento.nombre}</p>
            <p>{(new Date(evento.fecha)).toLocaleString()}</p>
            <p>{evento.descripcion}</p>
            <p>{evento.categoria}</p>
            <button onClick={() => borrarEvento(evento.id)}>
              <RiDeleteBinLine />
            </button>
          </li>
        )) : "No hay eventos"}
      </ul>
      <form onSubmit={handleSubmit}>
        <p>Crear evento</p>
        <input
          type="text"
          placeholder="Nombre"
          minLength={4}
          maxLength={50}
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora_inicio"
          value={formData.hora_inicio}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora_final"
          value={formData.hora_final}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          maxLength={250}
          placeholder="Descripcion"
        >
        </textarea>
        <button type="submit">CREAR</button>
      </form>
    </div>
  )
}

export default Eventos