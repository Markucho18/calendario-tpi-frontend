import styles from "../styles/BarraLateral.module.css"
import MiniCalendario from "./MiniCalendario";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const BarraLateral = ({estado}) => {
  return (
    <aside className={`${estado ? styles.abierto : styles.cerrado} ${styles.aside}`}>
      <button className={styles.botonCrear}>
        <span><FaPlus /></span>
        {estado && (
          <>
            Crear
            <IoMdArrowDropdown />
          </>
        )}
      </button>
      <MiniCalendario />
    </aside>
  )
}

export default BarraLateral