import logo from "../assests/LogoSD.png"
import background from "../assests/background.jpg"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";



export default function LoginPage(){
    
    const navigate = useNavigate();
    const [loginError,setloginError] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext)

    async function login(ev){
        ev.preventDefault();
        
        
        const api_login = await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })
        if(!api_login.ok){
           setloginError(await api_login.json())
            // alert(loginError);
            
        }
        if(api_login.ok){
            api_login.json().then(userInfo=>{
                console.log(userInfo);
                
                setUserInfo(userInfo);
                // alert(userInfo.message)
                setRedirect(true)
            })
            
        }
 
    }
    if(redirect){
        // console.log('in nav');
        return <Navigate to={'/'}/>
    }

    function nav_signup(){
        navigate('/register');
    }

return(

<>

<div className="login_bg"></div>
<form className="login_container" onSubmit={login}>



    <div className="login_graphic_container">
        <img className="graphic_logo" src={logo} alt="" />
        {/* <p className="graphic_title" >Where Digital Innovation</p> */}
        <p className="graphic_title" >Where Innovation Meets Ingenuity</p>
        {/* <p className="graphic_title2" >Meets Human Ingenuity.</p> */}
        <p className="graphic_desc">Connecting Tech Enthusiasts to Share Digital Trends"</p>
        {/* <p className="graphic_desc">Connecting Tech Enthusiasts to <br/> Explore, Discuss, and Share Insights<br/> on the Latest Trends in Digital Technology</p> */}
    </div>

    <div className="login_creds_container">

        <h1 className="login_header">Login</h1>
        <p className="login_header_desc">Please enter your details</p>

        <div className="login_input_boxes">

            <p className="login_input_headers">Username</p>

            {/* <TextField id="standard-basic" className="login_buttons" variant="standard" /> */}
            <input type="text" className="login_buttons" value={username} onChange={ev=>setUsername(ev.target.value)} placeholder="Enter your username..." /><br />
                    
            <p className="login_input_headers" >Password</p>
            {/* <TextField id="standard-basic" className="login_buttons"  variant="standard" /> */}
            <input type="password" className="login_buttons" value={password} onChange={ev=>setPassword(ev.target.value)} placeholder="Enter your password..." /><br />
        
           
         </div>

         {loginError && <p style={{textAlign:'center',color:'red',fontFamily:'Noto Sans',fontWeight:'550', marginTop:'-20px',marginBottom:'25px'}}>Wrong Credentials</p>}

        <button className="login_button">Login</button>

        <p className="login_sign_up">Don't Have an account? <span onClick={nav_signup} style={{color:"purple", marginLeft:'5px'}}>Sign Up</span></p>

    </div>
       
</form>
</>   
    )
}