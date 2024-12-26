import styles from "../styles/BarraLateral.module.css"
import colorCategoria from "../utils/colorCategoria"
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEventosContext } from "../contexts/EventosContext";

const Categoria = ({nombre}) => {

  const mayus = (string) => {
    return `${string[0].toUpperCase()}${string.slice(1)}`
  }

  const {categoriasActivas, setCategoriasActivas} = useEventosContext()

  const [activo, setActivo] = useState(true)

  const alternarEstado = () => {
    const estaActiva = categoriasActivas.includes(nombre)
    console.log({estaActiva})
    if(estaActiva){
      setCategoriasActivas(prev => {
        return prev.filter(categoria => categoria !== nombre)
      })
    } else{
      setCategoriasActivas(prev => {
        return [...prev, nombre]
      })
    }
    setActivo(prev => !prev)
  }

  return (
    <li onClick={alternarEstado}>
      <div
        style={{
          border: `solid 2px ${colorCategoria(nombre)}`,
          backgroundColor: activo ? colorCategoria(nombre) : ""
        }}
        className={styles.contenedorCheck}
      >
        <input type="checkbox" />
        {activo && <FaCheck /> }
      </div>
      <p>{mayus(nombre)}</p>
      <button onClick={(e) => {
        e.stopPropagation()
      }}>
        <BsThreeDotsVertical />
      </button>
    </li>
  )
}

export default Categoria