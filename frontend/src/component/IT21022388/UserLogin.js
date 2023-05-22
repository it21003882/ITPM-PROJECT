import { useState } from "react";
import { faSignInAlt,faUser,faUnlockAlt,faBriefcase ,faBicycle ,faCar,faCarSide,faPlane    } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {motion} from 'framer-motion';
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from "../IT21003882/FOoter";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(true);
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (isLogin) => {
    setIsLoginForm(isLogin);
  }
 
  const userSignUp = (e) => {
        console.log("Hi")
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (name === '') {
            toast.error("Please Enter User Name..", {
                id: 'name'
            })
        }
        else if (phone_number === '') {
            toast.error("Please Provide a Phone Number..", {
                id: 'phone_number'
            })
        }
        else if (address === '') {
            toast.error("Please Enter Address..", {
                id: 'stafNo'
            })
        }
        else if (email === '') {
            toast.error("Please Provide Your Email..", {
                id: 'email'
            })
        }
        // else if (!emailRegex.test(email)) {
        //     toast.error("Please Provide a Valid Email...", {
        //         id: 'valEmail'
        //     })
        // }
        else if (password === '') {
            toast.error("Please Provide a Password..", {
                id: 'pwd'
            })
        }
        else if (password.length < 8) {
            toast.error("Password should be at least 8 characters long", {
                id: 'pwdLength'
            })
        }
      else if (name !== '' && phone_number !== '' && address !== '' && email !== '') {
           
            const newUser = {
                name,
                email,
                password,
                phone_number,
                address,
                gender,
                image
            }
        
            const uid = axios.post("http://localhost:5000/user/Signup",newUser).then((res)=>{
                toast.success("Successfully Registred");
                navigate('/login');
                 const uid = res.data.payload.uid;
            }).catch((res)=>{
                toast.error("Something Went Wrong");
                console.log(res)
                 console.log(uid)
            })
      }
  }
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


        const uid = axios.post("http://localhost:5000/user/Signin",user).then((response)=>{
            toast.success("Successfull Login!");
            const uid = response.data.payload.uid; 
            console.log(uid);;
            navigate('/home/'+uid);
        }).catch(() => {
          alert('Not ok')
            toast.error("Something Went Wrong!")
        })
       
        setEmail('');
        setPassword('');
    }
}

  const buttonVariants = {
    visible:{
      x:[0,-20,20,-20,20,0],
      transition:{delay:2}
    },
    hover:{
      scale:1.1,
      textShadow:"0px 0px 8px rgb(255,255,255)",
      boxShadow:"0px 0px 8px rgb(255,255,255)",
      transition:{
        duration:0.3,
        yoyo: Infinity
      }
    }
  }
  const loaderVariants = {
    animationOne: {
      x: [-150, 150],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 15,
          repeat: Infinity,
        }
      }
    }
  };

  return (
    <section className="vh-100" >
      <div className="container-fluid" style={{backgroundColor:'white'}} > <br/>
        <br/><div className="row">
          <div >
          <center>
            
          <motion.div style={{ border: "2px solid black", backgroundColor: "black", borderRadius: "20px", padding: "10px" , width:"40%", color:'white'}}
        //   transition={{delay:0.2,duration:2.0,type:'spring', stiffness:120}}
        //   whileHover={{boxShadow:"0px 0px 8px rgb(255,255,255)", scale:1.03}}
          ><h3>Welocme</h3> <hr/>
          
           
            <div className="px-5 ms-xl-4">
              {/* <i
                className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                style={{ color: "#709085" }}
              ></i> */}
           
            {/* <motion.span
            className="h1 fw-bold mb-0"
            // whileHover={{ scale: 1.3, color: ['#f8e112', '#ff00ff', '#00ffff'], originX: 0 }}
            // transition={{ type: 'spring', stiffness: 500 }}
            >
            
            <span style={{ background: "-webkit-linear-gradient(#800000, #A52A2A, #A0522D)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent", textAlign:"center" }}>ආයුබෝවන් !</span> <br/>


            </motion.span> */}

            </div> 
            {/* <motion.div
                        className="loader"
                        variants={loaderVariants}
                        animate="animationOne"
                      >
                        <FontAwesomeIcon icon={faPlane   } />
                      </motion.div> */}
            <div style={{width:'80%'}}>
           
                <br/>
                
              <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist" style={{listStyle: 'none'}}>
                <li className="nav-item" role="presentation">
                    <motion.a
                    className={`nav-link ${isLoginForm ? 'active' : ''}`}
                    id="tab-login"
                    data-mdb-toggle="pill"
                    href="#pills-login"
                    role="tab"
                    aria-controls="pills-login"
                    aria-selected={isLoginForm}
                    onClick={() => handleTabClick(true)}
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0px 0px 8px rgb(255,255,255)",
                        boxShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    style={{
                        background: 'linear-gradient(90deg, #20b2aa   , #7fffd4     , #20b2aa   ,#7fffd4     , #20b2aa  )',
                        borderRadius: "20px",
                        color: "black",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                        transition: "all 0.3s ease",
                        marginRight: "10px",
                    }}
                    >
                    Login
                    </motion.a>
                </li>
                <li className="nav-item" role="presentation">
                    <motion.a
                    className={`nav-link ${!isLoginForm ? 'active' : ''}`}
                    id="tab-register"
                    data-mdb-toggle="pill"
                    href="#pills-register"
                    role="tab"
                    aria-controls="pills-register"
                    aria-selected={!isLoginForm}
                    onClick={() => handleTabClick(false)}
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0px 0px 8px rgb(255,255,255)",
                        boxShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    style={{
                        background:
                        'linear-gradient(90deg, #20b2aa   , #7fffd4     , #20b2aa   ,#7fffd4     , #20b2aa  )',
                        borderRadius: "20px",
                        color: "black",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                        transition: "all 0.3s ease",
                        marginLeft: "10px"
                    }}
                    >
                    Register
                    </motion.a>
                </li>
                </ul>

                
                    {isLoginForm ?
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
                     
                         <div className="text-center">
                           <p style={{ color: "grey" }}>Not a member? <a href="#pills-register" style={{ color: "#6a11cb", textDecoration: "underline" }}>Register</a></p>
                         </div>
                       </form>
                     </div>
                     
          :
            <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form onSubmit={userSignUp}>
                <br/>
                                        <div className="row">
                                            <div className="col-md-12">
                                            <div className="form-outline mb-4">
                                                <input type="text" id="registerName" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="ex: Amanda Gimhani"/>
                                                <label className="form-label" htmlFor="registerName">Name</label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                            <div className="form-outline mb-4">
                                                <input type="email" id="registerEmail" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="ex: amandagimhani@gmail.com"/>
                                                <label className="form-label" htmlFor="registerEmail">Email</label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-outline mb-4">
                                                <input type="password" id="registerPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="ex: xxxxx"/>
                                                <label className="form-label" htmlFor="registerPassword">Password</label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-outline mb-4">
                                                <input type="number" id="registerPassword" className="form-control" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="ex: 071X XXX XXXX"/>
                                                <label className="form-label" htmlFor="registerPassword">Phone Number</label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-outline mb-4">
                                                <input type="text" id="registerPassword" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="ex: 33A/XX, XXX, XXX"/>
                                                <label className="form-label" htmlFor="registerPassword">Address</label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="form-outline mb-12">
                                            <select className="form-select" id="registerGender" onChange={(e) => setGender(e.target.value)}>
                                            <option selected disabled>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            </select>
                                            <label className="form-label" htmlFor="registerGender">Gender</label>
                                        </div>
                                        </div>
                                        <div className="form-outline mb-12">
                                          <select className="form-select" id="registerGender" onChange={(e) => setImage(e.target.value)}>
                                            <option disabled selected>Select Gender</option>
                                            <option value="https://i.pinimg.com/originals/b3/1e/87/b31e876ac1381404535b3a7287bf9605.png">Female Avatar</option>
                                            <option value="https://th.bing.com/th/id/R.54e9ec5365eeb967838ffd2a35eda50b?rik=h%2bfY8HSuXACUPQ&riu=http%3a%2f%2fwww.hotavatars.com%2fwp-content%2fuploads%2f2019%2f01%2fI80W1Q0.png&ehk=NSQkB5B%2fUOzON7Gd8fGH9%2bEBxOki2BAu6FdDH0E1TGY%3d&risl=&pid=ImgRaw&r=0">Male Avatar</option>
                                          </select>
                                          <label className="form-label" htmlFor="registerGender">Select Avatar</label>
                                        </div>
                                        <div className="selected-avatar">
                                          {image && <img src={image} alt="Selected Avatar" width={'50%'}/>}
                                        </div>

                                       <br/>
                                        
                                        <motion.button type="submit" className="btn btn-block mb-3" 
                                        style={{
                                            background:
                                            'linear-gradient(90deg, #20b2aa   , #7fffd4     , #20b2aa   ,#7fffd4     , #20b2aa  )',
                                            borderRadius: "20px",
                                            color: "black",
                                            fontWeight: "bold",
                                            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                                            transition: "all 0.3s ease",
                                            marginLeft: "10px",
                                        }}>Sign Up</motion.button>
                                      

                                    </form>
                                </div>
                                }

                        <div class="tab-content">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            
                        </div>
                        </div>

                               {/* <span style={{ background: "-webkit-linear-gradient(#f8e112, #ff00ff, #00ffff)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" }}># VISIT SRI LANKA</span> */}
            </div></motion.div></center>
          </div>
        </div> <br/> <br/>
      </div>   <Footer/>
    </section>
  );
}
export default Login;