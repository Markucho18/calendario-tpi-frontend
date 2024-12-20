const ModalCrearEvento = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault()
    try{
      setFormData(initialFormData)
    } catch(error){
      console.log(error.message ?? "Ocurrio un error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
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
        <input
          type="time"
          name="hora_final"
          value={formData.hora_final}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        >

        </textarea>
      </form>
    </div>
  )
}

export default ModalCrearEvento