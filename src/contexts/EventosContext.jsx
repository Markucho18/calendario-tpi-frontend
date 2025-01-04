import { useContext, createContext, useState, useEffect } from "react";

const EventosContext = createContext()

const URL = "http://localhost:3001/eventos"

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

  const obtenerEventos = async () => {
    try{
      const response = await fetch(URL, {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      const {msg, rows} = data
      if(!response.ok) throw new Error(msg)
      setEventos(rows)
      setEventosFiltrados(rows)
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const crearEvento = async (infoEvento) => {
    try{
      const response = await fetch(`${URL}/crear`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(infoEvento)
      })
      const data = await response.json()
      if(!response.ok) throw new Error(data.msg)
      setEventos(prev => [...prev, infoEvento])
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const editarEvento = (infoEvento) => {
    setEventos(prev => {
      const nuevoEstado = prev.map((evento) => {
        if(evento.id === infoEvento.id) return infoEvento
        else return evento
      })
      return nuevoEstado
    })
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