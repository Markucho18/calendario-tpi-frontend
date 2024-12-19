import styles from "../styles/VistaDia.module.css"

const VistaDia = () => {
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
        <div className={styles.tableroDia}></div>
      </div>
    </main>
  )
}

export default VistaDia