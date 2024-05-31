import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth, db } from '../firebase'
import { setDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import './register.css'

const Register = () => {

  const navigator = useNavigate()

  const goToLogIn = ()=>{
    navigator('/logIn')
  }



    const handleRegister = async (e)=>{
        e.preventDefault()

        try {
               await createUserWithEmailAndPassword(auth, email, password)
               const user = auth.currentUser;
               console.log(user);
               if(user){
                await setDoc(doc(db, "Users",user.uid),{
                    email : user.email,
                    firstName : fname,
                    lastName : lname,
                })
                window.location.href="/logIn"
               }
               console.log('user registered successfully');
               toast.success('User Registered Successfully',{
                position:'top-center'
               })
        } catch (error) {
            console.log(error.message);
            toast.success(error.message,{
                position:'top-bottom'
               })
        }
    }

    const [fname, setFname] =  useState("")
    const [lname, setLname] =  useState("")
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")


    return (
      <div className="register-con">
         <div className="container">
         <div className="title">
          <h1>Register</h1>
          </div>
          <div className="form-con">
          <form action="" onSubmit={handleRegister}>
            <input type="text" onChange={(e)=>setFname(e.target.value)} placeholder="First Name" name="" id="" />
            <input type="text" onChange={(e)=>setLname(e.target.value)} placeholder="Last Name" name="" id="" />
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" name="" id="" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" name="" id="" />
            <input type="submit" value='Register' name="" id="" />
            <a href="#" onClick={goToLogIn}>Already have an account</a>
          </form>
          </div>
         </div>
      </div>
    )
  }
  
  export default Register
  