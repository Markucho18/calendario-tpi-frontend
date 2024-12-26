import styles from "../styles/ModalDatosEvento.module.css"
import colorCategoria from "../utils/colorCategoria"
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const ModalDatosEvento = ({datosEvento}) => {

  const formatearFecha = (fecha) => {
    const indiceSemana = (new Date(fecha)).getDay()
    const diaSemana = dias[indiceSemana]
    const indiceMes = (new Date(fecha)).getMonth()
    const mes = meses[indiceMes]
    const dia = fecha.split("-")[2]
    const fechaFormateada = `${diaSemana}, ${mes} ${dia}`
  }

  const {nombre, categoria, fecha, hora_inicio, hora_final} = datosEvento

  return (
    <div className={styles.contenedorDatosEvento}>
      <header>
          <MdOutlineEdit />
          <RiDeleteBinLine />
          <MdOutlineClose />
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
        <p>{hora_inicio} - {hora_final}</p>
      </main>
    </div>
  )
}

export default ModalDatosEvento