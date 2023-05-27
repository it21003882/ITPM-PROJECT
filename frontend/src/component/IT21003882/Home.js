import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion,useCycle  } from 'framer-motion';
import Header from "../IT21022388/Header";
import { faCalendarAlt, faShoppingCart, faDonate, faNewspaper, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Footer from "./FOoter";

const colors = [ "#98fb98  ", "#ead5dc", "#fd5e53 ", "#cc4e5c ", "#cc3333 ","#a45a52 ","#a45a52 ","#cc3333  ","#cc4e5c","#fd5e53 ","#ff9999 "];


function Home() {

    const {id} = useParams();
    const [color, cycleColor] = useCycle(...colors);

    
    useEffect(() => {
        const timer = setInterval(() => {
          cycleColor();
        }, 1000);
        return () => clearInterval(timer);
      }, [cycleColor]);

    return (
        <div style={{fontFamily: 'Rockwell'}}>
            <Header/>
           <motion.div
            style={{
                width: "96%",
                border: "2px solid white",
                borderRadius: "20px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                backgroundColor:"white",
            }}
            >
            <div style={{ position: "relative" }}>
            <img src="https://img.freepik.com/premium-photo/hand-holding-tree-blur-green-nature_34152-1963.jpg?w=900" style={{ height: "500px", width: "100%", marginTop:'10px', borderRadius:'5px', marginLeft:'25px' }} />
            <div style={{ position: "absolute", top: 0, left: '25px', right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="right-angle" style={{backgroundColor:'black', marginRight:'840px', height:'500px', marginTop:'10px', borderBottomLeftRadius:'10px', borderTopLeftRadius:'10px',opacity: 0.5}}>
            <style>
                {`
                .right-angle::after {
                content: "";
                position: absolute;
                top: 10px;
                right: 700px;
                width: 1px;
                height: 20px;
                border-left: 140px solid #000000  ;
                border-top: 500px solid transparent;
                }
                `}
            </style>
            <motion.h1
                style={{ 
                    fontSize: "30px", 
                    fontWeight: "bold",  
                    padding: "30px", 
                    fontStyle: "italic",
                    color: "white",
                    transition: "color 0.10s ease",
                    fontFamily:'Myanmar Text',
                }}
                >
                <br/>3R'S Cycling System <br/><br/><br/>
                <span style={{ color: 'white', fontSize:'13px'}}>3R's cycling services system is created for managing waste in Sri Lanka. From this system, our goal is to Raise awareness. Our web application often aims to educate the public about the importance of proper waste disposal and recycling.</span>
                {/* <span style={{ color: 'black', }}> Your Profile</span> */}
                </motion.h1> 
            </div></div></div>
            </motion.div>
            <br/><br/>

            <div >
                <div style={{marginLeft:'-900px'}}>
                    <Link to={`/event/${id}`} style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{color:'green'}} size="4x"/>
                        <p style={{color:'black', fontSize:'20px'}}>Events</p>
                    </Link>
                </div>
                <div style={{marginLeft:'-300px', marginTop:'-105px'}}>
                    <Link to={`#`} style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faShoppingCart } style={{color:'green'}} size="4x"/>
                        <p style={{color:'black', fontSize:'20px'}}>Products</p>
                    </Link>
                </div>
                <div style={{marginLeft:'300px', marginTop:'-113px'}}>
                    <Link to={`/donation/${id}`} style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faDonate } style={{color:'green'}} size="4x"/>
                        <p style={{color:'black', fontSize:'20px'}}>Donate</p>
                    </Link>
                </div>
                <div style={{marginLeft:'900px', marginTop:'-116px'}}>
                    <Link to={`/#`} style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faNewspaper } style={{color:'green'}} size="4x"/>
                        <p style={{color:'black', fontSize:'20px'}}>News</p>
                    </Link>
                </div>
            </div> <br/><br/>
            <div>
                <div style={{marginLeft:'-600px'}}>
                    <h2>Vision</h2>
                    <p>Our vision is to be the leading online platform for<br/> waste management, serving as a catalyst for positive <br/> change in how we approach waste globally. We envision a <br/> future where waste is seen as a valuable resource <br/> rather than a burden, and where sustainable waste management<br/>  practices are embraced by individuals, businesses, and<br/>  governments alike. Through our website, we aim to<br/>  foster a global community that shares knowledge, best practices,<br/>  and innovative solutions to tackle the waste crisis. We<br/>  aspire to inspire and empower individuals to make <br/> informed choices, adopt sustainable behaviors, and actively<br/>  participate in the circular economy. Together, we can<br/>  create a world where waste is minimized, resources<br/>  are maximized, and the environment thrives.</p>
                </div>
                <div style={{marginLeft:'600px', marginTop:'-400px'}}>
                    <h2>Mission</h2>
                    <p>Our mission is to promote sustainable waste management<br/>  practices and provide comprehensive information and<br/>  resources to empower individuals, businesses,<br/> and communities  in effectively managing and <br/>reducing waste. Through our website, we strive to <br/>create awareness about the environmental impact <br/>of waste and inspire positive actions towards waste<br/> reduction, recycling, and responsible disposal. We aim<br/> to be a trusted source of knowledge, practical solutions,<br/> and innovative ideas that contribute to a cleaner <br/>and greener future for generations to come. Together,<br/> let's turn waste into opportunity and build a more <br/>sustainable world.</p>
                </div>
            </div>
            <br/><br/><br/>
            <Link to={`/knowldge/${id}`}>
            <button style={{backgroundColor:color,
                        transition: "all 0.3s ease",
                        marginRight: "10px",
                    }}>Knowledge Base  <FontAwesomeIcon icon={faArrowRight} /></button></Link><br/>
                    <Footer/>
        </div>
    )
}

export default Home