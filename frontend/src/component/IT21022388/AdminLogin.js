import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../IT21003882/FOoter";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(true);
    const navigate = useNavigate();


    
  const userLogin = (e) => {
     
    e.preventDefault();
    console.log("Hi")
    if (email === '') {
      
        toast.error("Please Provide An Email..!", {
            id: "email"
        })
    }
    else if (password === '') {
      
        toast.error("Please Provide the Password..!", {
            id: "'password'"
        })
    }
    else if (email === '' && password === '') {
       
        toast.error("PPlease provide the Credentials...!", {
            id: "credential"
        })
    }

    else if (email !== '' & password !== '') {
        const user = {
            email,
            password
        }


        const uid = axios.post("http://localhost:5000/admin/Signin",user).then((response)=>{
            toast.success("Successfull Login!");
            const uid = response.data.payload.uid; 
            console.log(response.data);
            navigate('/admin/donation/'+uid);
        }).catch(() => {
          alert('Not ok')
            toast.error("Something Went Wrong!")
        })
       
        setEmail('');
        setPassword('');
    }
}

    return (
        <div style={{fontFamily: 'Rockwell', color:'white'}}>
          <section className="vh-100" >
      <div className="container-fluid" > <br/>
        <br/><div className="row">
          <div >
          <center>
            
          <motion.div style={{ border: "2px solid black", backgroundColor: "black", borderRadius: "20px", padding: "10px" , width:"40%"}}><h3>Admin Login</h3> <hr/>
          
            <div style={{width:'80%'}}>
           
                <br/>
                
             
                       <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'80%'}}>
                       <form onSubmit={userLogin}> <br/>
                     
                       <div className="form-outline mb-4"><br/>
                           <input type="email" id="loginName" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                           <label className="form-label" htmlFor="loginName">Email</label>
                         </div>
                     
                         <div className="form-outline mb-4">
                           <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                           <label className="form-label" htmlFor="loginPassword">Password</label>
                         </div>
                     
                         <button type="submit" className="btn btn-block mb-4" 
                         style={{ background: 'linear-gradient(90deg, #20b2aa   , #7fffd4     , #20b2aa   ,#7fffd4     , #20b2aa  )', borderRadius: "20px", color: "black", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
                         whileHover={{
                          scale: 1.1,
                          textShadow: "0px 0px 8px rgb(255,255,255)",
                          boxShadow: "0px 0px 8px rgb(255,255,255)",
                          }} >Sign in</button>
                     
                       </form>
                     </div>
                     
          

         </div></motion.div></center>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
        </div>
    )
}

export default AdminLogin