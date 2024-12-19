import styles from "../styles/App.module.css"
import { useState } from "react"
import Header from "./Header"
import BarraLateral from "./BarraLateral"
import VistaDia from "./VistaDia"
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const PaginaPrincipal = () => {

  const [estadoBarra, setEstadoBarra] = useState(true)
  
  const [vista, setVista] = useState("dia")

  return (
    <div className={styles.contenedorPrincipal}>
      <button className={styles.botonCrear}>
        <span><FaPlus /></span>
        {estadoBarra && (
          <>
            Crear
            <IoMdArrowDropdown />
          </>
        )}
      </button>
      <Header
        handleBarra={setEstadoBarra}
      />
      <div className={`
        ${styles.seccionPrincipal}
        ${!estadoBarra && styles.cerrado}
      `}>
        <BarraLateral
          estado={estadoBarra}
        />
        {vista === "dia" && (
          <VistaDia/>
        ) }
      </div>
    </div>
  )
}

export default PaginaPrincipal