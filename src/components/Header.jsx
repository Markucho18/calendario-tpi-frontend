import { useEffect, useState } from "react";
import ModalVistas from "./ModalVistas";
import styles from "../styles/Header.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import formatearFecha from "../utils/formatearFechaHeader";
import obtenerDatosUsuario from "../utils/obtenerDatosUsuario";


const Header = ({handleBarra}) => {

  const [modalVistas, setModalVistas] = useState(false)

  const [vista, setVista] = useState("dia")

  return (
    <header className={styles.Header}>
      <section>
        <button
          onClick={() => handleBarra(prev => !prev)}
          className={styles.sideBarButton}
        >
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
        <p className={styles.fecha}>{formatearFecha()}</p>
      </section>
      <section>
        <div className={styles.contenedorVistas}>
          <button
            onClick={() => setModalVistas(prev => !prev)}
            className={styles.botonVista}
          >
            {`${vista[0].toUpperCase()}${vista.slice(1)}`}
            <IoMdArrowDropdown />
          </button>
          {modalVistas && (
            <ModalVistas
              handleVista={setVista}
              cerrarModal={() => setModalVistas(false)}
            />
          )}
        </div>
        <p className={styles.avatar}>
          {obtenerDatosUsuario("nombre").slice(0,1)}
        </p>
      </section>
    </header>
  )
}

export default Header