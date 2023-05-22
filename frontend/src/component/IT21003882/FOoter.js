import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion,useCycle  } from 'framer-motion';
import Header from "../IT21022388/Header";
import { faCalendarAlt, faShoppingCart, faDonate, faNewspaper, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

function Footer() {

    return (
        <div style={{fontFamily: 'Rockwell',background:'linear-gradient(90deg, #008080  , #7fffd4   , #008080  ,#7fffd4   , #008080 )'}}>
           <hr/>
           <div>
            <div style={{marginRight:'950px'}}><Link to={`/#`} style={{ textDecoration: 'none', color:'black'}}><h4>About Us</h4></Link></div>
            <div style={{marginRight:'600px', marginTop:'-35px'}}><Link to={`/#`} style={{ textDecoration: 'none', color:'black'}}><h4>Privacy</h4></Link></div>
            <div style={{marginRight:'200px', marginTop:'-35px'}}><Link to={`/login`} style={{ textDecoration: 'none', color:'black'}}><h4>Login</h4></Link></div>
           </div>
           <div>
            <h6 style={{marginLeft:'600px', marginTop:'-30px'}}>Stay Connected</h6>
            <div>
                <div style={{marginLeft:"510px"}}>
                    <Link><img src="https://th.bing.com/th/id/R.428aab3a308ed902761a4c5b1496a8bc?rik=MeNSXSj8Gs04Yw&pid=ImgRaw&r=0" width={'4%'}/></Link>
                </div>
                <div style={{marginLeft:"700px", marginTop:'-42px'}}>
                    <Link><img src="https://docs.smooch.io/images/channel-header-logos/logo_whatsapp.png" width={'6%'}/></Link>
                </div>
                <div style={{marginLeft:"900px", marginTop:'-40px'}}>
                    <Link><img src="https://binghamprospector.org/wp-content/uploads/2012/10/facebook-1024x1024.png" width={'6%'}/></Link>
                </div>
                <div style={{marginLeft:"1100px", marginTop:'-30px'}}>
                    <Link><img src="https://th.bing.com/th/id/R.88d88f1872909358b97ffa695cb97b66?rik=A77az%2fwRYB%2bLrw&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f05%2fGmail_logo_icon.png&ehk=8gYQfqc8h6fYCXddKEQE%2blQ7004YVwPu1S2LSHmiUgE%3d&risl=&pid=ImgRaw&r=0" width={'10%'}/></Link>
                </div>
            </div><br/><br/>
            <center><hr style={{color:'whitesmoke',width:'60%'}}/></center>
            <h6>Copyright @ 2021 3R's Cycling Inc. All rights reserved.</h6>
            <br/>
           </div>
        </div>
    )
}

export default Footer