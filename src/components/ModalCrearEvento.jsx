import styles from "../styles/ModalEvento.module.css"
import { useState } from "react"
import { FaRegClock } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuText } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const ModalCrearEvento = ({cerrarModal}) => {

  const initialFormData = {
    nombre: "",
    fecha: "",
    hora_inicio: "",
    hora_final: "",
    categoria: "",
    descripcion: ""
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const categorias = ["estudio", "trabajo", "deporte", "ocio"]

  const handleCategoria = (value) => {
    setFormData(prev => {
      return {...prev, categoria: value}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try{
      //EL BACKEND EXTRAE EL USUARIO DESDE LA VALIDACION DEL TOKEN, NO ES NECESARIO HACERLO ACA
      //HACER SELECTS EN VEZ DE INPUTS TIME, UN POCO MAS ENGORROSO PERO UTIL
      setFormData(initialFormData)
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  const [opciones, setOpciones] = useState(false)
  const toggleOpciones = () => setOpciones(prev => !prev)

  return (
    <div
      className={styles.contenedorModalEvento}
      onClick={cerrarModal}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) =>{
          e.stopPropagation()
          setOpciones(false)
        }}
      >
        <MdClose
          className={styles.botonCerrar}
          onClick={cerrarModal}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Titulo"
          value={formData.nombre}
          onChange={handleChange}
          minLength={4}
          maxLength={70}
        />
        <div className={styles.datosFecha}>
          <FaRegClock />
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
          <input
            type="time"
            name="hora_inicio"
            value={formData.hora_inicio}
            onChange={handleChange}
          />
          <p>-</p> 
          <input
            type="time"
            name="hora_final"
            value={formData.hora_final}
            onChange={handleChange}
          />
        </div>
        <div className={styles.datosCategoria}>
          <MdLabel />
          <div
            className={styles.contenedorCategoria}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={toggleOpciones}
              className={styles.tituloCategoria}
            >
              <p>{formData.categoria.length > 0 
              ? `${formData.categoria[0].toUpperCase()}${formData.categoria.slice(1)}`
              : "Categoria"}</p>
              <IoMdArrowDropdown />
            </div>
            {opciones && (
              <div className={styles.opcionesCategoria}>
                {categorias.map((categoria, i) => (
                  <p onClick={() => {
                    handleCategoria(categoria)
                    toggleOpciones()
                  }}>
                    {`${categoria[0].toUpperCase()}${categoria.slice(1)}`}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.datosDescripcion}>
          <LuText />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength={250}
          >

          </textarea>
        </div>
        <footer>
          <button type="submit">
            Guardar
          </button>
        </footer>
      </form>
    </div>
  )
}

export default ModalCrearEvento