import styles from "../styles/ModalDatosEvento.module.css"
import colorCategoria from "../utils/colorCategoria"
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { useEventosContext } from "../contexts/EventosContext";
import { useModalesContext } from "../contexts/ModalesContext";

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const ModalDatosEvento = ({ladoModal, datosEvento, cerrarModal}) => {

  const {abrirModalEditarEvento} = useModalesContext()

  const {borrarEvento} = useEventosContext()

  const formatearFecha = (fecha) => {
    const indiceSemana = (new Date(fecha)).getDay()
    const diaSemana = dias[indiceSemana]
    const indiceMes = (new Date(fecha)).getMonth()
    const mes = meses[indiceMes]
    const dia = (fecha.split("T")[0]).split("-")[2]
    const fechaFormateada = `${diaSemana}, ${mes} ${dia}`
    return fechaFormateada
  }

  const formatearHora = hora => hora.slice(0,5)

  const {id, nombre, categoria, fecha, hora_inicio, hora_final} = datosEvento

  return (
    <div className={`${styles.contenedorDatosEvento} ${styles[ladoModal]}`}>
      <header>
          <MdOutlineEdit onClick={() => {
            abrirModalEditarEvento(datosEvento)
            cerrarModal()
          }}/>
          <RiDeleteBinLine onClick={() => borrarEvento(id)}/>
          <MdOutlineClose onClick={cerrarModal}/>
      </header>
      <main>
        <div className={styles.titulo}>
          <span
            style={{backgroundColor: colorCategoria(categoria)}}
            className={styles.colorCategoria}
          >
          </span>
          <p>{nombre}</p>
        </div>
        <p>{formatearFecha(fecha)}</p>
        <p>{formatearHora(hora_inicio)} - {formatearHora(hora_final)}</p>
      </main>
    </div>
  )
}

export default ModalDatosEvento