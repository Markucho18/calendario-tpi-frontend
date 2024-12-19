import styles from "../styles/VistaDia.module.css"

const VistaDia = () => {
  return (
    <main className={styles.contenedorTablero}> 
      <aside>
        {Array.from({length: 12}).map((_,i) => (
          <p>{`${i + 1}AM`}</p>
        ))}
        {Array.from({length: 12}).map((_,i) => (
          <p>{`${i + 1}PM`}</p>
        ))}
      </aside>
      <div className={styles.tableroDia}></div>
    </main>
  )
}

export default VistaDia