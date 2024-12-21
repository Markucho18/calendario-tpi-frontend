import styles from "../styles/ModalEvento.module.css"
import { useState } from "react"
import SelectHora from "./SelectHora";
import { FaRegClock } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuText } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const ModalCrearEvento = ({cerrarModal}) => {

  const calcularHoraEn30Mins = () => {
    const horaEnSegundos = new Date(Date.now() + 30 * 60 * 1000)
    return horaEnSegundos.toLocaleTimeString().slice(0, 5)
  }
  
  const fechaActual = ((new Date()).toISOString()).split("T")[0]
  const horaActual = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`
  const horaEn30Mins = calcularHoraEn30Mins()

  const initialFormData = {
    nombre: "",
    fecha: fechaActual,
    hora_inicio: horaActual,
    hora_final: horaEn30Mins,
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

  const handleHoraInicio = (hora) => {
    setFormData(prev =>{
      return {...prev, hora_inicio: hora}
    })
  }

  const handleHoraFinal = (hora) => {
    setFormData(prev =>{
      return {...prev, hora_final: hora}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try{
      //EL BACKEND EXTRAE EL USUARIO DESDE LA VALIDACION DEL TOKEN, NO ES NECESARIO HACERLO ACA
      //HACER SELECTS EN VEZ DE INPUTS TIME, UN POCO MAS ENGORROSO PERO UTIL
      console.log({formData})
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
        <section className={styles.datosFecha}>
          <FaRegClock />
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
          <div className={styles.contenedorHora}>
            <input
              type="time"
              name="hora_inicio"
              value={formData.hora_inicio}
              onChange={handleChange}
            />
            <SelectHora
              rango={[1, 2, 3]}
              setHora={handleHoraInicio}
            />
          </div>
          <p>-</p> 
          <div className={styles.contenedorHora}>
            <input
              type="time"
              name="hora_final"
              value={formData.hora_final}
              onChange={handleChange}
            />
            <SelectHora
              rango={[1, 2, 3]}
              setHora={handleHoraFinal}
            />
          </div>
        </section>
        <section className={styles.datosCategoria}>
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
                  <p
                    key={i} 
                    onClick={() => {
                      handleCategoria(categoria)
                      toggleOpciones()
                    }}
                  >
                    {`${categoria[0].toUpperCase()}${categoria.slice(1)}`}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className={styles.datosDescripcion}>
          <LuText />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength={250}
          >

          </textarea>
        </section>
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