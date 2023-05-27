import React from "react";
import { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Header from "./Header";
import {
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
  } from 'mdb-react-ui-kit';
import i1 from './images/certificate.png'
import Footer from "../IT21003882/FOoter";

function VolunteerRegister() {

    const [full_name, setFullName] = useState("");
    const [email_address, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [area, setArea] = useState("");
    const [event_name, setEventName] = useState("");
    const navigate = useNavigate();

    const {id,eventId} = useParams();

    const getEventName = () => {
        axios.get("http://localhost:5000/event/get/"+eventId)
        .then((res) => {
            setEventName(res.data.event.event_name)
            console.log(res.data.event.event_name);
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    useEffect(() => getEventName(), []);

    const addVolunteer = (e) => {
     
        e.preventDefault();
        console.log("Hi")
        if (event_name === '') {
          
            toast.error("Please Provide Event Name..!", {
                id: "email"
            })
        }
        else if (phone_number === '') {
          
            toast.error("Please Provide the Password..!", {
                id: "'password'"
            })
        }
        else if (email_address === '') {
           
            toast.error("PPlease provide the Credentials...!", {
                id: "credential"
            })
        }
    
        else if (event_name !== '' & phone_number !== '' & event_name !== '' ) {
            const volunter = {
                full_name,
                email_address,
                age,
                phone_number,
                area,
                event_name
            }
    
    
            const uid = axios.post("http://localhost:5000/volunteer/add",volunter).then((response)=>{
                toast.success("You are request to this event!");
                // const uid = response.data.payload.uid; 
                // console.log(uid);;
                // alert('ok')
                navigate('/event/'+id);
            }).catch(() => {
              alert('Not ok')
                toast.error("Something Went Wrong!")
            })
           
        }
    }



    return (
        <div><Header/>
        <div style={{fontFamily: 'Rockwell',color:'white', backgroundImage:'url(https://previews.123rf.com/images/krabata/krabata1108/krabata110800281/10330757-green-recycling-round-background.jpg)'}}>
            <br/>
           <center><h1 style={{backgroundColor:'white', width:'30%', color:'black'}}>Volunteer Register<br/></h1></center><br/> <br/><br/>
           <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{marginLeft:'60px'}}>
          
            <MDBCol>
            <MDBCard style={{ border: "none" }}>
            <MDBCardBody>
            <br/> <br/>
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'125%', backgroundColor:'black', borderRadius:'10px', marginTop:'-60px'}}>
                       <form onSubmit={addVolunteer}> <br/>
                     
                       <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}><br/>
                           <input type="text" id="loginName" className="form-control" onChange={(e) => setFullName(e.target.value)} />
                           <label style={{fontSize:'20px'}} className="form-label" htmlFor="loginName">Full Name</label>
                         </div>
                     
                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="email" id="loginPassword" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                           <label style={{fontSize:'20px'}} className="form-label" htmlFor="loginPassword">Email</label>
                         </div>

                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="number" id="loginName" className="form-control" onChange={(e) => setAge(e.target.value)} />
                           <label style={{fontSize:'20px'}} className="form-label" htmlFor="loginName">Age</label>
                         </div>
                     
                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="number" id="loginPassword" className="form-control" onChange={(e) => setPhoneNumber(e.target.value)}/>
                           <label style={{fontSize:'20px'}} className="form-label" htmlFor="loginPassword">Phone Number</label>
                         </div>

                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="text" id="loginName" className="form-control" onChange={(e) => setArea(e.target.value)} />
                           <label style={{fontSize:'20px'}} className="form-label" htmlFor="loginName">Area</label>
                         </div>
                     
                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="text" id="loginPassword" className="form-control" value={event_name}  readOnly/>
                           <label style={{fontSize:'20px'}} className="form-label" htmlFor="loginPassword">Event Name</label>
                         </div>
                     
                         <button type="submit" className="btn btn-block mb-4" 
                         style={{ fontSize: "1.2rem", background: "linear-gradient(90deg, #008000, #008000 , #008000,#008000 , #008000)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease"}}
                          >Submit</button>
                     
                       </form>
                     </div>
                     
           
            </MDBCardBody> 
            </MDBCard>
            </MDBCol>
      
           
        </MDBRow>
        <div style={{marginLeft:'635px', marginTop:'-730px',textAlign:'justify', backgroundColor:'black', color:'white', borderRadius:'10px'}}>
            <br/><h4 style={{marginLeft:'50px'}}>Volunteers can obtain e-certificate for their service</h4> <br/>
            <p style={{padding:'20px'}}>Volunteers can often obtain certificates to recognize and acknowledge their contributions and efforts. Volunteer certificates serve as a 
                form of appreciation and validation for the time and skills dedicated to a particular cause or organization. These certificates can be awarded by the organization or group that the volunteer is supporting.<br/><br/>
Volunteer certificates can be valuable for volunteers in various ways. They can be included in resumes or portfolios to showcase their volunteer experience and demonstrate their commitment to community service. Additionally, these certificates can provide a sense of achievement and serve as a tangible reminder of the impact they have made through their volunteer work.

            </p>
            <img style={{marginLeft:'100px'}} src={i1} width={"70%"}/>
            <br/><br/>
            
            </div><br/><br/><br/><br/>
            <center>
            <div style={{backgroundColor:'black', width:'90%', borderRadius:'10px'}}> <br/>
            <h4 style={{color:'white'}}>What is volunteer mean</h4> 
            <div style={{textAlign:'justify', color:'white'}}><br/><br/>
                <p style={{paddingLeft:'50px',paddingRight:'50px'}}>
                A volunteer is an individual who willingly offers their time, skills, and efforts to engage in activities or provide services without expecting any monetary compensation or personal gain. Volunteers typically work for nonprofit organizations, community groups, or charitable causes, driven by a desire to make a positive impact and contribute to the betterment of society.
                Volunteering involves a wide range of activities and can vary depending on the organization or cause being supported. Some common examples of volunteering include assisting at community events, participating in environmental cleanups, serving meals at a soup kitchen, tutoring students, helping with fundraising efforts, or providing support to individuals in need.<br/><br/>
                Volunteers play a crucial role in addressing social, environmental, and humanitarian issues, as their contributions help to fill gaps, support vulnerable populations, and drive positive change. Volunteering not only benefits the community and those in need but also offers personal satisfaction, opportunities for personal growth, and the chance to develop new skills and connections.
                Overall, volunteers selflessly dedicate their time and efforts to contribute to causes they care about, embodying the spirit of altruism and making a meaningful difference in the world.

                </p><br/>
            </div>
            </div>
            </center>   <Footer/>
        </div>
        </div>
    )
}

export default VolunteerRegister