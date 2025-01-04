import styles from "../styles/VistaMes.module.css"
import { useEffect, useState } from "react"
import { useEventosContext } from "../contexts/EventosContext"
import colorCategoria from "../utils/colorCategoria"
import ModalDatosEvento from "./ModalDatosEvento"

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"]

const VistaMesDia = ({key, fecha, idModalDatosEvento, cerrarModalDatos, abrirModalDatos}) => {

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

  //Para que no desborde la pantalla el modal con info
  const obtenerLadoModal = (fecha) => {
    const indiceSemana = (new Date(fecha)).getDay()
    //Si es vienres o sabado
    const estaAlBorde = indiceSemana == 4 || indiceSemana == 5
    const lado = estaAlBorde ? "izquierda" : "derecha"
    return lado
  }

  const [ladoModal, setLadoModal] = useState("derecha")

  useEffect(()=>{
    const lado = obtenerLadoModal(fecha)
    setLadoModal(lado)
  },[])

  return (
    <div className={styles.diaMes}>
      {eventosDia.some(evento => evento.id === idModalDatosEvento) && (
        <ModalDatosEvento
          ladoModal={ladoModal}
          datosEvento={eventosDia.find(evento => evento.id === idModalDatosEvento)}
          cerrarModal={cerrarModalDatos}
        />
      )}
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
          key={i}
          style={{backgroundColor: colorCategoria(evento.categoria)}}
          className={styles.evento}
          onClick={() => abrirModalDatos(evento.id)}
        >
          ({evento.hora_inicio.slice(0,5) ?? "Sin Hora"}) {evento.nombre}
        </div>
      ))}
    </div>
  )

}

export default VistaMesDia