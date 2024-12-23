import styles from "../styles/ModalEvento.module.css"
import { useState } from "react"
import { FaRegClock, FaTheRedYeti } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuText } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import crearIntervaloHoras from "../utils/crearIntervaloHoras";
import { useEventosContext } from "../contexts/EventosContext";

const URL = "http://localhost:3001/eventos/crear"

const ModalCrearEvento = ({cerrarModal}) => {

  const compararHoras = (inicio, final) => {
    const horasInicio = parseInt(inicio.split(":")[0])
    const horasFinal = parseInt(final.split(":")[0])
    const minutosInicio = horasInicio * 60 + parseInt(inicio.split(":")[1])
    const minutosFinal = horasFinal * 60 + parseInt(final.split(":")[1])
    const esValido = (minutosFinal - minutosInicio) > 0
    console.log({minutosFinal, minutosInicio, esValido})
    return esValido
  }

  const fechaActual = ((new Date()).toISOString()).split("T")[0]

  const initialFormData = {
    nombre: "",
    fecha: fechaActual,
    hora_inicio: "00:00",
    hora_final: "00:30",
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

  const validarDatos = (formData) => {
    const {hora_inicio, hora_final, nombre} = formData
    const errores = []
    const horaValida = compararHoras(hora_inicio, hora_final)
    const tituloValido = nombre.length !== 0
    if(!horaValida) errores.push("El rango de horas no es valido")
    if(!tituloValido) errores.push("El titulo no puede estar vacio")
    return errores
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const errores = validarDatos(formData)
      if(errores.length > 0) throw new Error(errores[0])
      const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if(!response.ok) throw new Error(data.msg)
      console.log({response, data, formData})
      setFormData(initialFormData)
    } catch(error){
      toast(error.message ?? "Ocurrio un error", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        style:{
          color: "red"
        }
      });
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
      <ToastContainer />
    </div>
  )
}

export default ModalCrearEvento