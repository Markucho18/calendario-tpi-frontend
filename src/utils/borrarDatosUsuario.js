const borrarDatosUsuario = () => {
  localStorage.removeItem("id")
  localStorage.removeItem("nombre")
}

export default borrarDatosUsuario