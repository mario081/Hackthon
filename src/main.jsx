import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ReportsProvider } from './context/ReportsProvider.jsx'
import { SettingsProvider } from './context/SettingsProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <ReportsProvider>
          <App />
        </ReportsProvider>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
