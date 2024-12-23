import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { EventosContextProvider } from "./contexts/EventosContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <EventosContextProvider>
    <App />
  </EventosContextProvider>
)
