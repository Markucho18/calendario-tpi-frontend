const coloresCategorias = {
  indefinido: "#778899",
  estudio: "#4A90E2",
  trabajo: "#50E3C2",
  deporte: "#B8E986",
  hogar: "#F8E71C",
  salud: "#D0021B",
  ocio: "#BD10E0",
  finanzas: "#F5A623",
  social: "#9013FE"
};

const colorCategoria = (categoria) => {
  return coloresCategorias[categoria]
}

export default colorCategoria;
