import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
  } from 'mdb-react-ui-kit';
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "../IT21003882/FOoter";

function UserViewEvent() {    //meken tamai userta event tika pennane

    const [events,setEvenets] = useState([]);
    const {id} =useParams();
   
    useEffect(()=>{
        function getEvenets(){
        axios.get("http://localhost:5000/event/getall").then((res)=>{
          setEvenets(res.data.payload);
            console.log(res.data.payload)
        }).catch((err)=>{
            alert(err.message);
        })
        }
        getEvenets();
    },[events])

     //serach 
    const [serQuary,setSerQuary]=useState("");

    function searchEmployee(event){
            setSerQuary(event.target.value);
    }


    return (
      <div><Header/>
        <div style={{fontFamily: 'Rockwell', color:'white', backgroundImage:'url(https://th.bing.com/th/id/R.ea50105e178066cf6876dfbbe76ed38e?rik=GIrqlDrezN1I9g&pid=ImgRaw&r=0)'}}>  
            <br/><input onChange={searchEmployee}  placeholder="Search....." style={{marginLeft:'1000px', backgroundColor:'white', color:'black'}}/>
            <center><br/><h1 style={{backgroundColor:'white',width:'20%', color:'black'}}>Events</h1></center><br/>
            <br/><div style={{marginLeft:'1000px'}}>
            <Calendar />
            </div>
            <div style={{marginTop:'-300px'}}>
            {events
            .filter(event=>  //me function eka nisa tamai search eka wada krnne

                event.event_name.toLowerCase().includes(serQuary) ||   //event name and venue ekenui search krnna pluwn
                event.event_name.includes(serQuary) ||
                event.venue.toLowerCase().includes(serQuary) ||
                event.venue.includes(serQuary) 
  
                )
              .map(event => ( 
           <MDBRow className='row-cols-1 g-4' style={{marginLeft:'35px', width:'60%', backgroundColor:'white'}}>
     
            <MDBCol>
            <MDBCard style={{ border: "none" }}>
           
            <img src={require(`../../../../backend/Event_Photos/${event.image}`)}/>
           <MDBCardBody style={{backgroundColor:'black'}}>
         
            <MDBCardTitle style={{ fontSize: "25px", textAlign:"left"  }}>{event.event_name}</MDBCardTitle>
                <MDBCardText style={{ fontSize: "16px", textAlign:"left" }}>
                    Time - {event.time}
                </MDBCardText>
                <MDBCardText style={{ fontSize: "14px" , textAlign:"left" }}>
                    Venue - {event.venue}
                </MDBCardText>
                <MDBCardText style={{ fontSize: "14px", textAlign:"left"  }}>
                    About - {event.description}
                </MDBCardText>
                <Link to={`/volunteerReg/${id}/${event._id}`}>
                <button  className="btn" title="click button to join to event" style={{ background: "linear-gradient(90deg, #008000, #008000 , #008000,#008000 ,#008000)", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" ,marginLeft:'600px' }}
                >Join US</button> </Link>
                </MDBCardBody> <br/><br/>
            </MDBCard>
            </MDBCol>
           
        </MDBRow>
        ))} 
        </div>
        <Footer/>
        </div></div>
    )
}

export default UserViewEvent