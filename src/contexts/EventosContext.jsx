import { useContext, createContext, useState, useEffect } from "react";

const EventosContext = createContext()

const URL = "http://localhost:3001/eventos"

export const EventosContextProvider = ({children}) => {

  const [eventos, setEventos] = useState([])
  const [eventosFiltrados, setEventosFiltrados] = useState([])

  const categories = [
    { nombre: "Estudio", color: "#4A90E2" },
    { nombre: "Trabajo", color: "#50E3C2" },
    { nombre: "Deporte", color: "#B8E986" },
    { nombre: "Hogar", color: "#F8E71C" },
    { nombre: "Salud", color: "#D0021B" },
    { nombre: "Ocio", color: "#BD10E0" },
    { nombre: "Finanzas", color: "#F5A623" },
    { nombre: "Social", color: "#9013FE" }
  ];

  const categorias = ["estudio", "trabajo", "deporte", "ocio"]
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

  const borrarEvento = (idEvento) => {
    setEventos(prev => prev.filter(evento => evento.id !== idEvento))
  }

  const filtrarPorCategoria = (categorias) => {
    const nuevoEstado = eventos.filter(evento => categorias.includes(evento.categoria))
    setEventosFiltrados(nuevoEstado)
  }

  useEffect(()=>{
    obtenerEventos()
  },[])

  useEffect(()=>{
    console.log({eventos}) 
  },[eventos])

  useEffect(()=>{
    console.log({eventosFiltrados})
  },[eventosFiltrados])

  useEffect(()=>{
    filtrarPorCategoria(categoriasActivas)
    console.log({categoriasActivas})
  },[categoriasActivas])

  return (
    <EventosContext.Provider
      value={{
        eventos, setEventos,
        eventosFiltrados, setEventosFiltrados,
        categorias,
        categoriasActivas, setCategoriasActivas,
        crearEvento,
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