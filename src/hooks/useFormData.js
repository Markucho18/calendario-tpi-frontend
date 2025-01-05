import { useState } from "react"

const useFormData = (initialFormData) => {

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
  const handleCategoria = (value) => {
    setFormData(prev => {
      return {...prev, categoria: value}
    })
  }

  const limpiarForm = () => {
    setFormData(initialFormData)
  }

  return {formData, setFormData, limpiarForm, handleChange, handleCategoria}
}

export default useFormData