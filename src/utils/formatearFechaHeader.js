const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
]

const formatearFecha = () => {
  const hoy = new Date()
  const dia = hoy.getDate()
  const numeroMes = hoy.getMonth()
  const anio = hoy.getFullYear()
  const mes = meses[numeroMes]
  const formato = `${mes} ${dia}, ${anio}`
  return formato
}

export default formatearFecha