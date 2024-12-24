import { useContext, createContext, useState, useEffect } from "react";

const EventosContext = createContext()

const URL = "http://localhost:3001/eventos"

export const EventosContextProvider = ({children}) => {

  const [eventos, setEventos] = useState()
  const [eventosFiltrados, setEventosFiltrados] = useState([])

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
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const crearEvento = (infoEvento) => {
    setEventos(prev => [...prev, infoEvento])
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

  const borrarEvento = (idEvento) => {
    setEventos(prev => prev.filter(evento => evento.id !== idEvento))
  }

  const filtrarCategoria = (categorias) => {
    setEventosFiltrados(prev => {
      const nuevoEstado = prev.filter(evento => categorias.includes(evento.categoria))
      return nuevoEstado
    })
  }

  useEffect(()=>{
    obtenerEventos()
  },[])

  useEffect(()=>{
    console.log({eventos}) 
  },[eventos])

  return (
    <EventosContext.Provider
      value={{
        eventos, setEventos
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