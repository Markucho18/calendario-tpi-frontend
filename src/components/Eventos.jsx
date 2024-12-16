import { useState, useEffect } from "react"

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

  return (
    <ul>
      {eventos.length > 0 ? eventos.map((evento, i)=>(
        <li
          key={i}
        >
          <p>{evento.nombre}</p>
          <p>{evento.fecha}</p>
          <p>{evento.descripcion}</p>
          <p>{evento.categoria}</p>
        </li>
      )) : "No hay eventos"}
    </ul>
  )
}

export default Eventos