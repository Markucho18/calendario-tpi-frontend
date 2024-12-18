import styles from "../styles/Header.module.css"

const ModalVistas = ({handleVista, cerrarModal}) => {

  const vistas = ["dia", "semana", "mes", "año"]

  return (
    <div className={styles.modalVistas}>
      {vistas.map((vista, i) => (
        <p
          key={i}
          className={styles.modalOpcion}
          onClick={() => {
            handleVista(vista)
            cerrarModal()
          }}
        >
          {`${vista[0].toUpperCase()}${vista.slice(1)}`}
        </p>
      ))}
    </div>
  )
}

export default ModalVistas