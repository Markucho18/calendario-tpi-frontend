import styles from "../styles/App.module.css"
import { useState } from "react"
import Header from "./Header"
import BarraLateral from "./BarraLateral"
import VistaDia from "./VistaDia"
import VistaMes from "./VistaMes"
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const PaginaPrincipal = ({toggleModalEvento}) => {

  const [estadoBarra, setEstadoBarra] = useState(true)
  
  const [vista, setVista] = useState("dia")

  const [modalOpciones, setModalOpciones] = useState(false)

  return (
    <div className={styles.contenedorPrincipal}>
      <div className={styles.contenedorBoton}>
        <button
          onClick={() => setModalOpciones(prev => !prev)}
          className={styles.botonCrear}
        >
          <span><FaPlus /></span>
          {estadoBarra && (
            <>
              Crear
              <IoMdArrowDropdown />
            </>
          )}
        </button>
        {modalOpciones && (
          <div className={styles.modalOpciones}>
            <p
              onClick={() =>{
                toggleModalEvento()
                setModalOpciones(false)
              }}
              className={styles.modalOpcion}
            >
              Evento
            </p>
            <p
              onClick={() => setModalOpciones(false)}
              className={styles.modalOpcion}
            >
              Tarea
            </p>
          </div>
        )}
      </div>
      <Header
        vista={vista}
        handleVista={setVista}
        handleBarra={setEstadoBarra}
      />
      <div className={`
        ${styles.seccionPrincipal}
        ${!estadoBarra && styles.cerrado}
      `}>
        <BarraLateral
          estado={estadoBarra}
        />
        {vista === "dia" && <VistaDia/>}
        {vista === "mes" && <VistaMes/>}
      </div>
    </div>
  )
}

export default PaginaPrincipal