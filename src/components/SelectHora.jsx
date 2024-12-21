import styles from "../styles/ModalEvento.module.css"
import crearIntervaloHoras from "../utils/crearIntervaloHoras"

const SelectHora = ({rango, setHora}) => {

  crearIntervaloHoras()

  return (
    <ul className={styles.selectHora}>
      {rango.map((hora, i)=>(
        <li
          key={i}
          onClick={() => setHora(hora)}
        >
          {hora}
        </li>
      ))}
    </ul>
  )
}

export default SelectHora