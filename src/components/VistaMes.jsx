import styles from "../styles/VistaMes.module.css"
import { useEffect, useState } from "react"
import generarCalendario from "../utils/generarCalendario"

const dias = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"]

const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DEC"]

const VistaMes = () => {

  const [mes, setMes] = useState(new Date().getMonth() + 1)
  const [anio, setAnio] = useState(new Date().getFullYear())
  const [semanasCalendario, setSemanasCalendario] = useState(generarCalendario(mes, anio).slice(0, -1))

  useEffect(()=>{
    console.log({semanasCalendario, mes})
  },[semanasCalendario])

  return (
    <main className={styles.contenedorVistaMes}>
      {semanasCalendario.map((semana, i) => (
        <div
          key={i}
          className={styles.semanaMes}
        >
          {semana.map((dia, j) => (
            <div
              key={j}
              className={styles.diaMes}
            >
              {i === 0 && <p>{dias[j]}</p> }
              <p>
                {parseInt(dia.split("-")[1]) !== mes & parseInt(dia.split("-")[2]) === "01" ? meses[parseInt(dia.split("-")[1]) - 1] : ""}
                {dia.split("-")[2]}
              </p>
            </div>
          ))}
        </div>
      ))}
    </main>
  )
}

export default VistaMes