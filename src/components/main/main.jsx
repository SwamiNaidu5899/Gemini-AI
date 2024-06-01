import './main.css'
import { assets } from '../../assets/assets'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/context'
import {auth, db} from '../../auth/firebase'
import { doc, getDoc } from 'firebase/firestore'

const Main = () => {

    const inputRef = useRef()
    const [title, setTitle] = useState()
    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const {input, onSent, recentPrompt, showResult, loading, resultData, setInput} = useContext(Context)

    const [userDetails, setUserDetails] = useState(null)

        async function handleLogOut(){
            try {
                await auth.signOut()
                window.location.href ='/logIn'
                console.log('User logged out successfully');
            } catch (error) {
                console.log(error.message);
            }
        }

    const fetchUserData = async() =>{
        auth.onAuthStateChanged(async(user)=>{
            console.log(user);
            const docRef =  doc(db, 'Users', user.uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setUserDetails(docSnap.data())
                console.log(docSnap.data());
                setTitle(userDetails.firstName)
            }
            else{
                console.log('user not logged in');
            }
           
            console.log(title)
        })
    }

    useEffect(()=>{
        fetchUserData()
    },[])


  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="profileDetails">
            {userDetails ? (
                <>
                <h3>{userDetails.firstName}</h3>
                <button onClick={handleLogOut}>LogOut</button>
                </> ) : (<p>Guest</p>
            )}

        </div>
        <div className="main-container">

        {!showResult ? <>
            <div className="greet">
                <p><span>Hello,{title}</span></p>
                <p>How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve your readability of following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
        </>
        :
        <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {
                    loading
                     ?
                      <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                      </div>
                     :  
                    <p style={{color:'white'}} dangerouslySetInnerHTML={{__html:resultData}}></p>

                }
            </div>
        </div>    
    }

           
            <div className="main-bottom">
                <div className="search-box">
                    <input ref={inputRef} onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' name="" id="" />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}  
                    </div>
                </div>
                <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double check its
                responses. Your privacy and Gemini apps.
            </p>
            </div>
          
        </div>
    </div>
  )
}

export default Main
