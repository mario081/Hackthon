import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ReportProvider } from './context/ReportContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReportProvider>
      <App />
    </ReportProvider>
  </React.StrictMode>,
)
