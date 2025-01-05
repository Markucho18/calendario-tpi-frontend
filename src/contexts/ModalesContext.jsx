import { createContext, useContext, useEffect, useState } from "react";

const ModalesContext = createContext()

export const ModalesContextProvider = ({children}) => {

  const [modalCrearEvento, setModalCrearEvento] = useState(false)
  const [modalEditarEvento, setModalEditarEvento] = useState({
    abierto: false, //estado
    datos: {} //datos del evento
  })
  const abrirModalEditarEvento = (datosEvento) => {
    console.log({datosEvento})
    setModalEditarEvento({abierto: true, datos: datosEvento})
  }
  const cerrarModalEditarEvento = () => {
    setModalEditarEvento({abierto: false, datos: {}})
  }

  return (
    <ModalesContext.Provider
      value={{
        modalCrearEvento, setModalCrearEvento,
        modalEditarEvento, setModalEditarEvento,
        abrirModalEditarEvento, cerrarModalEditarEvento
      }}
    >
      {children}
    </ModalesContext.Provider>
  )
}

export const useModalesContext = () => {
  const context = useContext(ModalesContext)
  if(!context) throw new Error("ModalesContext debe usarse en su provider")
  return context
}