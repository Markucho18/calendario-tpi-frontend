import styles from "../styles/VistaDia.module.css"
import calcularRango from "../utils/calcularRango"
import crearRangosHoras from "../utils/crearRangoHoras"



const VistaDia = () => {

  const rangoHoras = crearRangosHoras()

  calcularRango("00:00", "01:20")

  return (
    <main className={styles.contenedorVista}> 
      <header>
        Holanda
      </header>
      <div className={styles.contenedorTablero}>
        <aside>
          {Array.from({length: 12}).map((_,i) => (
            <p key={i}>{i == 0 ? "" : `${i} AM`}</p>
          ))}
          {Array.from({length: 15}).map((_,i) => (
            <p key={i}>{i === 14 ? "" : `${i === 0 ? 12 : i } PM`}</p>
          ))}
        </aside>
        <div className={styles.tableroDia}>
          {rangoHoras.map((hora, i)=>(
            <div
              key={i}
              rango={hora}
              className={styles.rango}
            >
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default VistaDia