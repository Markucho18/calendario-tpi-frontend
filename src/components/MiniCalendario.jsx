import styles from "../styles/BarraLateral.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import generarCalendario from "../utils/generarCalendario";
import { useEffect, useState } from "react";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
]

const dias = ["D", "L", "M", "X", "J", "V", "S"]

const MiniCalendario = () => {

  const [mes, setMes] = useState(new Date().getMonth() + 1)
  const [anio, setAnio] = useState(new Date().getFullYear())
  const [semanasCalendario, setSemanasCalendario] = useState(generarCalendario(mes, anio))

  const corregirMes = (numMes, numAnio) => {
    let nuevoMes = numMes
    let nuevoAnio = numAnio 
    if(numMes == 0){
      nuevoMes = 12
      nuevoAnio = numAnio - 1
    }
    else if(numMes == 13){
      nuevoMes = 1
      nuevoAnio = numAnio + 1
    }
    setMes(nuevoMes)
    setAnio(nuevoAnio)
  }

  useEffect(()=>{
    console.log({mes, anio})
  }, [mes])

  return (
    <div className={styles.miniCalendario}>
      <header style={styles.header}>
        <p>{`${meses[mes - 1]}, ${anio}`}</p>
        <div className={styles.flechas}>
          <IoIosArrowBack onClick={() => corregirMes(mes - 1, anio)}/>
          <IoIosArrowForward onClick={() => corregirMes(mes + 1, anio)}/>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            {dias.map((dia, i) => <th key={i}>{dia}</th>)}
          </tr>
        </thead>
        <tbody>
          {semanasCalendario.map((semana, i) => (
            <tr key={i}>
              {semana.map((fecha, i) =>{
                return parseInt(fecha.split("-")[1]) === mes ? (
                  <td
                    key={i}
                    style={{color: "white", fontWeight: "bold"}}
                  >
                    {fecha.split("-")[2]}
                  </td>
                ) : (
                  <td
                    key={i}
                  >
                    {fecha.split("-")[2]}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => generarCalendario(mes, anio)}>Generear</button>
    </div>
  )
}

export default MiniCalendario