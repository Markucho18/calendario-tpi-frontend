import styles from "../styles/BarraLateral.module.css"
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

const Categoria = ({nombre}) => {

  const [activo, setActivo] = useState(true)
  const toggleActivo = () => setActivo(prev => !prev)

  return (
    <li onClick={toggleActivo}>
      <div
        style={activo ? {backgroundColor: "red"} : {}}
        className={styles.contenedorCheck}
      >
        <input type="checkbox" />
        {activo && <FaCheck /> }
      </div>
      <p>{nombre}</p>
      <button onClick={(e) => {
        e.stopPropagation()
      }}>
        <BsThreeDotsVertical />
      </button>
    </li>
  )
}

export default Categoria