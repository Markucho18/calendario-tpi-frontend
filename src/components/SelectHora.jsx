import styles from "../styles/ModalEvento.module.css"

const SelectHora = ({rango, setHora}) => {

  return (
    <ul className={styles.selectHora}>
      {rango.map((hora, i)=>(
        <li
          key={i}
          onClick={() => setHora(hora[0])}
        >
          {`${hora[0]} (${hora[1]})`}
        </li>
      ))}
    </ul>
  )
}

export default SelectHora