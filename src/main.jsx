import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { EventosContextProvider } from "./contexts/EventosContext"
import { ModalesContextProvider } from "./contexts/ModalesContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <ModalesContextProvider>
  <EventosContextProvider>
    <App />
  </EventosContextProvider>
  </ModalesContextProvider>
)
