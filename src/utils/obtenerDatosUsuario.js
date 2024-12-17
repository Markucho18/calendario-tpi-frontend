const obtenerDatosUsuario = (dato) => {
  try{
    const valor = localStorage.getItem(dato) ?? null
    if(valor === null) throw new Error()
    return valor
  } catch(error){
    console.log(`No se encontro el dato "${dato}"`)
  }
}

export default obtenerDatosUsuario