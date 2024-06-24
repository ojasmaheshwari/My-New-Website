import React from 'react'
import { ProfileProvider } from "./services/ProfileContext";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<ProfileProvider>
    <App />
	</ProfileProvider>
  </React.StrictMode>,
)
