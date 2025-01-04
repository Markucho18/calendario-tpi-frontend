import styles from "../styles/VistaMes.module.css"
import { useEffect, useState } from "react"
import { useEventosContext } from "../contexts/EventosContext"
import generarCalendario from "../utils/generarCalendario"
import VistaMesDia from "./VistaMesDia"

const dias = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"]

const VistaMes = () => {

  const {eventos} = useEventosContext()

  const [mes, setMes] = useState(new Date().getMonth() + 1)
  const [anio, setAnio] = useState(new Date().getFullYear())
  const [semanasCalendario, setSemanasCalendario] = useState(generarCalendario(mes, anio).slice(0, -1))

  const [idModalDatosEvento, setIdModalDatosEvento] = useState()

  const cerrarModalDatos = () => setIdModalDatosEvento()

  const abrirModalDatos = (id) => setIdModalDatosEvento(id)

  useEffect(()=>{
    console.log({semanasCalendario, mes})
  },[semanasCalendario])

  return (
    <main className={styles.contenedorVistaMes}>
      <header>
        {dias.map((dia, i) => <p key={i}>{dia}</p> )}
      </header>
      {semanasCalendario.map((semana, i) => (
        <div
          key={i}
          className={styles.semanaMes}
        >
          {semana.map((dia, j) => (
            <VistaMesDia
              key={j}
              fecha={dia}
              idModalDatosEvento={idModalDatosEvento}
              cerrarModalDatos={cerrarModalDatos}
              abrirModalDatos={abrirModalDatos}
            />
          ))}
        </div>
      ))}
    </main>
  )
}

export default VistaMes