const crearIntervaloHoras = (inicio = "00:00") => {
  //hora_inicio
  if(inicio === "00:00"){
    const hoy = new Date()
    const milisegundos = (new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())).getTime()
    const horaLimite = (new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 45, 0)).getTime() 
    for(let i = milisegundos; i < horaLimite; i += 15 * 60 * 1000){
      const hora = i
      const horaLoca = new Date(hora).toLocaleTimeString()
      console.log({hora, horaLoca})
    }

    console.log({hoy, milisegundos, horaLimite})
  } else{

  }
}

export default crearIntervaloHoras