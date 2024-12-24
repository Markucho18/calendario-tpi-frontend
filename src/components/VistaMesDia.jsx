import styles from "../styles/VistaMes.module.css"
import { useEffect, useState } from "react"
import { useEventosContext } from "../contexts/EventosContext"

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"]

const VistaMesDia = ({fecha}) => {

  const {eventosFiltrados} = useEventosContext()

  const [eventosDia, setEventosDia] = useState([])

  const obtenerEventosDia = () => {
    const nuevosEventosDia = eventosFiltrados.filter(evento =>{
      const fechaEvento = evento.fecha.split("T")[0]
      return fechaEvento === fecha 
    })
    setEventosDia(nuevosEventosDia)
  }

  const [anio, mes, dia] = fecha.split("-")
  const mesActual = meses[parseInt(mes) - 1]
  
  useEffect(()=>{
    obtenerEventosDia()
  },[eventosFiltrados])

  return (
    <div className={styles.diaMes}>
      <p>
      {dia === "01" && (
        <span>
          {mesActual}
          &nbsp;
        </span>
      )}
        <span>
          {dia}
        </span>
      </p>
      {eventosDia.map((evento, i)=>(
        <div
          className={styles.evento}
          key={i}
        >
          ({evento.hora_inicio.slice(0,5) ?? "Sin Hora"}) {evento.nombre}
        </div>
      ))}
    </div>
  )

}

export default VistaMesDia