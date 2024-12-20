const crearRangosHoras = () => {
  const rangos = []
  for(let i = 0; i < 1440; i += 15){
    rangos.push([i, i + 14])
  }
  return rangos
}

export default crearRangosHoras