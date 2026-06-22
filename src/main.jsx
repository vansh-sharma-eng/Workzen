import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Components/Context/AuthProvider.jsx'
<<<<<<< HEAD
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { ThemeProvider } from './Components/Context/ThemeContext.jsx'
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <ThemeProvider>
    <App />
  </ThemeProvider>
      

=======

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <App />
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
   </AuthProvider>
   
  </StrictMode>,
)
