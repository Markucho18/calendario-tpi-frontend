import { useContext, createContext, useState, useEffect } from "react";

const EventosContext = createContext()

export const EventosContextProvider = ({children}) => {

  const [eventos, setEventos] = useState([])
  const [eventosFiltrados, setEventosFiltrados] = useState([])

  const categorias = [
    "indefinido",
    "estudio",
    "trabajo",
    "deporte",
    "hogar",
    "salud",
    "ocio",
    "finanzas",
    "social",
  ]
  const [categoriasActivas, setCategoriasActivas] = useState(categorias)

  //Para que queden con el formato YYYY-MM-DD
  const formatearFechas = (eventos) => {
    const nuevosEventos = eventos.map(evento => {
      const fechaFormateada = evento.fecha.split("T")[0]
      return {...evento, fecha: fechaFormateada}
    })
    return nuevosEventos
  }

  const obtenerEventos = async () => {
    try{
      const URL = "http://localhost:3001/eventos"
      const response = await fetch(URL, {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      const mensaje = data.msg
      const eventosBackend = data.rows
      if(!response.ok) throw new Error(mensaje)
      const nuevosEventos = formatearFechas(eventosBackend)
      setEventos(nuevosEventos)
      setEventosFiltrados(nuevosEventos)
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const crearEvento = async (infoEvento) => {
    try{
      const URL = "http://localhost:3001/eventos/crear"
      const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(infoEvento)
      })
      const {msg, id_evento} = await response.json()
      if(!response.ok) throw new Error(msg)
      const nuevoEvento = {...infoEvento, id: id_evento}
      setEventos(prev => [...prev, nuevoEvento])
      console.log({data})
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const editarEvento = async (infoEvento) => {
    try{
      const URL = "http://localhost:3001/eventos/editar"
      const response = await fetch(URL, {
        method: "PUT",
        credentials: "include",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(infoEvento)
      })
      const data = await response.json()
      const mensaje = data.msg
      if(!response.ok) throw new Error(mensaje)
      setEventos(prev => {
        const nuevoEstado = prev.map((evento) => {
          if(evento.id === infoEvento.id) return infoEvento
          else return evento
        })
        return nuevoEstado
      })
      console.log({mensaje})
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const borrarEvento = async (idEvento) => {
    try{
      const URL = `http://localhost:3001/eventos/borrar/${idEvento}`
      const response = await fetch(URL, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await response.json()
      console.log({mensaje: data.msg})
      setEventos(prev => prev.filter(evento => evento.id !== idEvento))
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const filtrarPorCategoria = (categorias) => {
    const nuevoEstado = eventos.filter(evento => categorias.includes(evento.categoria))
    setEventosFiltrados(nuevoEstado)
  }

  useEffect(()=>{
    obtenerEventos()
  },[])

  useEffect(()=>{
    filtrarPorCategoria(categoriasActivas)
  },[eventos, categoriasActivas])

  return (
    <EventosContext.Provider
      value={{
        eventos, setEventos,
        eventosFiltrados, setEventosFiltrados,
        categorias,
        categoriasActivas, setCategoriasActivas,
        crearEvento,
        editarEvento,
        borrarEvento,
      }}
    >
      {children}
    </EventosContext.Provider>
  )
}

export const useEventosContext = () => {
  const context = useContext(EventosContext)
  if(!context) throw new Error("EventosContext debe ser usado en su contenedor")
  return context
}