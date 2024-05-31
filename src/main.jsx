import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/context.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './auth/logIn/logIn'
import Register from './auth/register/register'



ReactDOM.createRoot(document.getElementById('root')).render(
  

  <ContextProvider>
      <BrowserRouter>
    <Routes>
      <Route path='/' element={<LogIn/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </ContextProvider>,
)
