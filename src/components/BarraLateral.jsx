import styles from "../styles/BarraLateral.module.css"
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const BarraLateral = ({estado}) => {
  return (
    <aside className={estado ? styles.abierto : styles.cerrado}>
      <button className={styles.botonCrear}>
        <span><FaPlus /></span>
        {estado && (
          <>
            Crear
            <IoMdArrowDropdown />
          </>
        )}
      </button>
    </aside>
  )
}

export default BarraLateral