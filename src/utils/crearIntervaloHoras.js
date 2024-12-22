const calcularDiferencia = (inicio, final) => {
  // Diferencia en milisegundos
  const diferenciaMs = final - inicio;
  // Convertir a segundos, minutos, horas
  const diferenciaSegundos = Math.floor(diferenciaMs / 1000);
  const diferenciaMinutos = Math.floor(diferenciaMs / (1000 * 60));
  // Obtener el resto para minutos y segundos
  const horas = Math.floor(diferenciaMinutos / 60);
  const minutos = diferenciaMinutos % 60;
  return `${horas}h${minutos}m`
}

const crearIntervaloHoras = (inicio) => {
  console.log({inicio})
  const hoy = new Date()
  const horas = inicio.split(":")[0]
  const minutos = inicio.split(":")[1]
  const msInicio = (new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), horas, minutos, 0)).getTime()
  const msFinal = (new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 0)).getTime()
  const rango = []
  for(let i = msInicio; i < msFinal; i += 15 * 60 * 1000){
    const msActuales = i
    const diferencia = calcularDiferencia(msInicio, msActuales)
    const horaFormateada = new Date(msActuales).toLocaleTimeString().slice(0,5)
    rango.push([horaFormateada, diferencia])
  }
  rango.shift()
  return rango
}

export default crearIntervaloHoras