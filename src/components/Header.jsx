import styles from "../styles/Header.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import formatearFecha from "../utils/formatearFechaHeader";

const Header = () => {

  return (
    <header>
      <button className={styles.sideBarButton}>
        <IoReorderThreeOutline className={styles.sideBarIcon}/>
      </button>
      <div className={styles.titulo}>
        <FaRegCalendarAlt />
        <p>Calendario</p>
      </div>
      <button className={styles.botonHoy}>
        Hoy
      </button>
      <div>
        <button className={styles.flechaDias}>
          <IoIosArrowBack />
        </button>
        <button className={styles.flechaDias}>
          <IoIosArrowForward />
        </button>
      </div>
      <p>{formatearFecha()}</p>
      <p style={{color: "white"}}>
        ARREGLAR DESBORDAMIENTOS ASAP
      </p>
    </header>
  )
}

export default Header