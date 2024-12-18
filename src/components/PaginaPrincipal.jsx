import styles from "../styles/App.module.css"
import Header from "./Header"
import BarraLateral from "./BarraLateral"
import { useState } from "react"

const PaginaPrincipal = () => {

  const [estadoBarra, setEstadoBarra] = useState(true)

  return (
    <div className={styles.contenedorPrincipal}>
      <Header
        handleBarra={setEstadoBarra}
      />
      <div className={styles.seccionPrincipal}>
        <BarraLateral
          estado={estadoBarra}
        />
      </div>
    </div>
  )
}

export default PaginaPrincipal