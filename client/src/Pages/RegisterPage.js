import { useState } from "react"
import logo from '../assests/cover_reg_crop.png'
import { Navigate, useNavigate } from "react-router-dom";

export default function  RegisterPage(){

    const navigate = useNavigate();
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');


    async function register(ev) {
        ev.preventDefault();
        const api_reponse = await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
        })
        if(api_reponse.status !== 200){
           const api_response_data = await api_reponse.json();
            alert(`Registration Failed \n \n Error: ${api_response_data.error}`)
        }else{
            alert('Registration Successful')
        }
        
    }
    function nav_login(){
        navigate('/login')
    }
    return(
        <>
        
        
        <div className="register_bg"></div>
       
        <form className="register" onSubmit={register}>

           

            <div className="register_container">

                
                <div className="register_creds_container">
                        
                    <h1 className="register_header">Register</h1>
                    <p className="register_header_desc">Please enter your details</p>
                    

                    <div className="register_input_boxes">


                        <p className="login_input_headers">Username</p>
                        <input type="text" value={username} onChange={ev => setusername(ev.target.value)} placeholder="Enter your username..." /><br />

                        <p className="login_input_headers">Password</p>
                        <input type="password" value={password} onChange={ev => setpassword(ev.target.value)} placeholder="Enter your password..." /><br />


                    </div>

                    <button className="register_button">Register</button>
                    <p className="login_sign_up">Already Have an account? <span onClick={nav_login} style={{color:"purple", marginLeft:'5px'}}>Log in</span></p>
                  

                </div>

                <div className="register_graphics_container" >
                  <img className="graphic_logo" src={logo} alt="" />
                  <p className="graphic_title" >Your Gateway to Innovation Starts Here.</p>
                <p className="graphic_desc">Become a Part of the Conversation. <br/>Collaborate, Learn, and Innovate in the Ever-Evolving Tech Landscape.</p>
                </div>
               
        
            </div>


        </form>
        
        </>
    )
}