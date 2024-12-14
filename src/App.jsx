import { useState, useEffect } from "react"
import styles from "./styles/App.module.css"

const URL = "https://bicicleteria-tpi-backend.onrender.com"

const App = () => {

  const [mensaje, setMensaje] = useState()

  const obtenerMensaje = async () => {
    try{
      const response = await fetch(URL, {
        method: "GET"
      })
      console.log({response})
    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    obtenerMensaje()
  },[])

  return (
    <div className={styles.App}>
        <p>Hola mundo</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa autem distinctio rerum iste amet nobis optio maiores quas doloremque facere.</p>
    </div>
  )
}

export default App