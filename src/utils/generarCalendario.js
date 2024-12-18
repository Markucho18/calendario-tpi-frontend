const formatearCeros = (num) => { 
  const nuevoNum = num < 10 ? `0${num}` : num
  return nuevoNum
}

const generarCalendario = (mes, anio) => {
  const primerDiaMes = new Date(anio, mes - 1, 1).getDay()
  //Cuando se pasa 0 como día en el constructor de Date, el objeto fecha automáticamente retrocede al último día del mes anterior.
  const diasMesActual = new Date(anio, mes, 0).getDate()
  const diasMesAnterior = new Date(anio, mes - 1, 0).getDate()

  const diasPrevios = primerDiaMes
  const diasTotales = 42
  const diasSiguientes = diasTotales - (diasPrevios + diasMesActual)

  const calendario = []
  const semanasCalendario = []

  //Dias del mes anterior
  for(let i = diasPrevios; i > 0; i--){
    const dia = formatearCeros(diasMesAnterior - i + 1)
    const mesAnterior = mes - 1 === 0 ? 12 : mes - 1
    const anioDeMesAnterior = mes - 1 === 0 ? anio - 1 : anio
    const fecha = `${anioDeMesAnterior}-${mesAnterior}-${dia}`
    calendario.push(fecha)
  }

  //Dias del mes actual
  for(let i = 1; i <= diasMesActual; i++){
    const dia = formatearCeros(i)
    const mesFormateado = formatearCeros(mes)
    const fecha = `${anio}-${mesFormateado}-${dia}`
    calendario.push(fecha)
  }

  //Dias del mes proximo
  for(let i = 1; i <= diasSiguientes; i++){
    const dia = formatearCeros(i)
    const mesSiguiente = formatearCeros(mes + 1 > 12 ? 1 : mes + 1)
    const anioMesSiguiente = mes + 1 > 12 ? anio + 1 : anio
    const fecha = `${anioMesSiguiente}-${mesSiguiente}-${dia}`
    calendario.push(fecha)
  }

  for(let i = 0; i < calendario.length; i += 7){
    const semana = calendario.slice(i, i + 7)
    semanasCalendario.push(semana)
  }

  console.log(semanasCalendario)

  return semanasCalendario

}

export default generarCalendario