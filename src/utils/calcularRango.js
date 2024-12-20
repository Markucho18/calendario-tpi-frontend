const calcularMinutos = (hora) => {
  const horas = parseInt(hora.split(":")[0])
  const horasEnMinutos = horas * 60
  const minutos = parseInt(hora.split(":")[1])
  const minutosTotales = horasEnMinutos + minutos
  return minutosTotales
}

const calcularRango = (inicio, fin) => {
  const minutosInicio = calcularMinutos(inicio)
  const minutosFin = calcularMinutos(fin)
  const rango = [minutosInicio, minutosFin]
  return rango
}

export default calcularRango