import styles from "../styles/VistaMes.module.css"
import { useEffect, useState } from "react"
import { useEventosContext } from "../contexts/EventosContext"
import colorCategoria from "../utils/colorCategoria"

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"]

const VistaMesDia = ({fecha}) => {

  const {eventosFiltrados} = useEventosContext()

  const [eventosDia, setEventosDia] = useState([])

  const ordenarPorHora = (eventos) => {
    const eventosOrdenados = eventos.sort((a, b) => {
      const [horaA, minutoA] = a.hora_inicio.split(":").map(Number);
      const [horaB, minutoB] = b.hora_inicio.split(":").map(Number);
      const minutosTotalesA = horaA * 60 + minutoA;
      const minutosTotalesB = horaB * 60 + minutoB;
      return minutosTotalesA - minutosTotalesB;
    });
    return eventosOrdenados
  }

  const obtenerEventosDia = () => {
    const nuevosEventosDia = eventosFiltrados.filter(evento =>{
      const fechaEvento = evento.fecha.split("T")[0]
      return fechaEvento === fecha 
    })
    const eventosOrdenados = ordenarPorHora(nuevosEventosDia)
    setEventosDia(eventosOrdenados)
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
          style={{backgroundColor: colorCategoria(evento.categoria)}}
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