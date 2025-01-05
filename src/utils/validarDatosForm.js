
const compararHoras = (inicio, final) => {
  const horasInicio = parseInt(inicio.split(":")[0])
  const horasFinal = parseInt(final.split(":")[0])
  const minutosInicio = horasInicio * 60 + parseInt(inicio.split(":")[1])
  const minutosFinal = horasFinal * 60 + parseInt(final.split(":")[1])
  const esValido = (minutosFinal - minutosInicio) > 0
  console.log({minutosFinal, minutosInicio, esValido})
  return esValido
}

const validarDatosForm = (formData) => {
  const { hora_inicio, hora_final, nombre } = formData;
  const errores = [];
  // Verificar si hora_inicio o hora_final están vacíos, undefined o null
  if (!hora_inicio || !hora_final) errores.push("Las horas no pueden estar vacías");
  // Verificar rango de horas
  const horaValida = compararHoras(hora_inicio, hora_final);
  if (!horaValida) errores.push("El rango de horas no es válido");
  // Verificar que el título no esté vacío
  if (!nombre || nombre.trim().length === 0) errores.push("El título no puede estar vacío");
  return errores;
};

export default validarDatosForm