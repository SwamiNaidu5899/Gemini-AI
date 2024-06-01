import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom"
import './logIn.css'

const LogIn = () => {

      const navigator = useNavigate()

      const goToRegister = ()=>{
        navigator('/register')
      }

      const guest = ()=>{
        navigator('/home')
      }

  const handlerSubmit= async (e)=>{
    e.preventDefault()

    try {
        await signInWithEmailAndPassword(auth, email, password)
        window.location.href="/home"
        console.log('login successful');
    } catch (error) {
        console.log(error.message);
    }

  }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <div className="logIn">
    <div className="container">
    <div className="title">
     <h3 className="logIn-title">LogIn</h3>
     </div>
      <div className="form-con">
      <form className="logIn-form" onSubmit={handlerSubmit}>
        <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} name="" id="" />
        <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password} name="" id="" />
        <input className="btn" type="submit" value='LogIn' />
        <input className="btn" onClick={guest} type="submit" value='Guest' />
        <a href="#" onClick={goToRegister}>Register</a>
      </form>
      </div>
    </div>
    </div>
  )
}

export default LogIn
