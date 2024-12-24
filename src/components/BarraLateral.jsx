import { useState } from "react";
import styles from "../styles/BarraLateral.module.css"
import MiniCalendario from "./MiniCalendario";
import Categoria from "./Categoria";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEventosContext } from "../contexts/EventosContext";

const BarraLateral = ({estado}) => {

  const {categorias} = useEventosContext()

  const [categoriasVisibles, setCategoriasVisibles] = useState(false)

  return (
    <aside className={`
      ${styles.sidebar}
      ${estado ? styles.abierto : styles.cerrado}
    `}>
      <MiniCalendario />
      <section className={styles.categorias}>
        <header onClick={() => setCategoriasVisibles(prev => !prev)}>
          <p>Categorias</p>
          {categoriasVisibles ? (
              <IoIosArrowUp/>
            ) : (
              <IoIosArrowDown/>
            )}
        </header>
        {categoriasVisibles && (
          <ul>
            {categorias.map((categoria, i) => (
              <Categoria
                key={i}
                nombre={categoria}
              />
            ))}
          </ul>
        )}
      </section>
    </aside>
  )
}

export default BarraLateral