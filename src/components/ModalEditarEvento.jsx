import styles from "../styles/ModalEvento.module.css"
import { useState } from "react"
import { FaRegClock, FaTheRedYeti } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuText } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEventosContext } from "../contexts/EventosContext";
import useFormData from "../hooks/useFormData";
import validarDatosForm from "../utils/validarDatosForm";

const ModalEditarEvento = ({datosEvento, cerrarModal}) => {

  const {categorias, editarEvento} = useEventosContext()

  const mayus = (string) => {
    return `${string[0].toUpperCase()}${string.slice(1)}`
  }

  const {formData, setFormData, limpiarForm, handleChange, handleCategoria} = useFormData(datosEvento)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const errores = validarDatosForm(formData)
      if(errores.length > 0) throw new Error(errores[0])
      await editarEvento(formData)
      limpiarForm()
      cerrarModal()
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
          <p>Categoria: </p>
          <div
            className={styles.contenedorCategoria}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={toggleOpciones}
              className={styles.tituloCategoria}
            >
              <p>{mayus(formData.categoria)}</p>
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
                    {mayus(categoria)}
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

export default ModalEditarEvento