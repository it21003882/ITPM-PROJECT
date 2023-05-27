import React, { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from "react";
import AdminHeader from "../IT21003882/AdminHeader";
import Footer from "../IT21003882/FOoter";

function AddEvent() {
    const [event_name, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [image, setImage] = useState("");

    const [upevent_name, setupEventName] = useState("");
    const [updescription, setupDescription] = useState("");
    const [uptime, setupTime] = useState("");
    const [upvenue, setupVenue] = useState("");
    const [upimage, setupImage] = useState("");

    const [events,setEvenets] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal1 = () => setShowModal1(false);

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

    const handleCatImg = (e) => {
        setImage(e.target.files[0]);
    }

    const handleCatImg1 = (e) => {
      setupImage(e.target.files[0]);
  }
    const eventAdd = (e) => {
      console.log("Hi")
        if (event_name === '') {
          
            toast.error("Please Provide Event Name..!", {
                id: "email"
            })
        }
        else if (description === '') {
          
            toast.error("Please Provide the Password..!", {
                id: "'password'"
            })
        }
        else if (time === '') {
           
            toast.error("PPlease provide the Credentials...!", {
                id: "credential"
            })
        }
    
        else if (event_name !== '' & description !== '' & time !== '' ) {

            const form =new FormData();

            form.append('event_name', event_name);
            form.append('description', description);
            form.append('time', time);
            form.append('venue', venue);
            form.append('image', image);
    
            const uid = axios.post("http://localhost:5000/event/add",form).then(()=>{
                toast.success("You are request to this event!");
                console.log("Hi")
                // const uid = response.data.payload.uid; 
                // console.log(uid);;
                // alert('ok')
                // navigate('/home/'+uid);
            }).catch(() => {
              alert('Not ok')
                toast.error("Something Went Wrong!")
            })
           
        }
    }

    const deleteEvent = (e) =>{
      var result = window.confirm("Are you sure?");
    if(result == true){
        axios.delete(`http://localhost:5000/event/delete/${e._id}`).then((res)=>{
        }).catch(e =>{
            alert(e)
        })
    }else{
        e.preventDefault();
    }
  
  }

  // const  geteventDetails = (e) => {
  //   axios.get("http://localhost:5000/event/get/"+e._id)
  //   .then((res) => {
  //       const event = {
  //           // inventory_id: res.data.inventory_id,
  //           // inventory_type: res.data.inventory_type,
  //           // item_name: res.data.item_name,
  //           // location: res.data.location,
  //           // update_date: res.data.update_date,
  //           // status: res.data.status
  //       }

  //       console.log(res.data.event.event_name);
  //       // setInventoryID(Inventory.inventory_id);
  //       // setInventoryType(Inventory.inventory_type);
  //       // setItemName(Inventory.item_name);
  //       // setLocation(Inventory.location);
  //       // setUpdateDate(Inventory.update_date);
  //       // setStatus(Inventory.status);
  //   })
  //   .catch((err) => {
  //       alert(err.message);
  //   });
  // }

  //serach 
  const [serQuary,setSerQuary]=useState("");

  function searchEmployee(event){
        setSerQuary(event.target.value);
  }

    return (
        <div style={{fontFamily: 'Rockwell'}}>
          <AdminHeader/><br/>
          <input onChange={searchEmployee}  placeholder="Search....." style={{marginLeft:'1000px'}}/>
         <center><br/><h1>Event Details</h1></center><br/>

        <table class="table table-bordered table-hover my-table" 
          style={{ width: '90%', float: 'left', marginLeft:'30px' }}>
            <thead >
              <tr>
                <th scope="col" style={{padding:'12px'}}>Event Name</th>
                <th scope="col" style={{padding:'12px'}}>Description</th>
                <th scope="col" style={{padding:'12px'}} >Time</th>
                <th scope="col" style={{padding:'12px'}}>Venue</th>
              </tr>
            </thead>
            <tbody>
            {events
            .filter(event=>

              event.event_name.toLowerCase().includes(serQuary) ||
              event.event_name.includes(serQuary) ||
              event.venue.toLowerCase().includes(serQuary) ||
              event.venue.includes(serQuary) 

              )
            
            .map(event => ( 
              <tr>
                <td style={{padding:'12px', textAlign:'justify'}}>{event.event_name}</td>
                <td style={{padding:'12px', textAlign:'justify'}}>{event.description}</td>
                <td style={{padding:'12px'}}>{event.time}</td>
                <td style={{padding:'12px'}}>{event.venue}</td>
                <td style={{ border: "none" }}>
                  <button  className="btn" style={{ background: "linear-gradient(90deg, #008000, #008000 , #008000,#008000 ,#008000)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
                  onClick={handleShowModal1}>Update</button>
                </td>
                <td style={{ border: "none" }}>
                  <button  className="btn" style={{ background: "linear-gradient(90deg, #FF0000, #8B0000 , #FF0000,#8B0000 ,#FF0000)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }} 
                  onClick={() => {deleteEvent(event)}} >Delete</button>
                </td>
                <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'80%'}}>
                       <form onSubmit={(e) => {
                            e.preventDefault();

                            
                        
                      const fromn1 =new FormData();

                      fromn1.append('event_name', upevent_name);
                      fromn1.append('description', updescription);
                      fromn1.append('time', uptime);
                      fromn1.append('venue', upvenue);
                      fromn1.append('image', upimage);
                                    
                            axios.put(`http://localhost:5000/event/update/${event._id}`, fromn1)
                            .then(() => {
                                toast.success('Event Updated');
                                console.log(upevent_name)
                                console.log(upimage)
                                // navigate('/inventory');
                            })
                            .catch((err) => {
                                alert(err);
                            })
                        }}>
                     
                        <div className="form-outline mb-4"><br/>
                          <label className="form-label" htmlFor="loginName">Event Name</label>
                           <input type="text" id="loginName" className="form-control" onChange={(e) => setupEventName(e.target.value)} />
                         </div>
                     
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginPassword">Description</label>
                           <input type="text" id="loginPassword" className="form-control" onChange={(e) => setupDescription(e.target.value)}/>
                         </div>

                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginName">Event Time</label>
                           <input type="time" id="loginName" className="form-control" onChange={(e) => setupTime(e.target.value)} />
                         </div>
                     
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginPassword">Event Venue</label>
                           <input type="text" id="loginPassword" className="form-control" onChange={(e) => setupVenue(e.target.value)}/>
                         </div>

                         <label htmlFor="outTime" className="col-sm-5 col-form-label">Event Photo</label>
                            <div className="col-sm-8">
                            <input type="file" className="form-control"  
                            onChange={(e) => { handleCatImg1(e) }}/>
                            </div>
                     <br/>
                         <button type="submit" className="btn btn-block mb-4" 
                         style={{ background: "linear-gradient(90deg, #3b3c36, #555d50 , #3b3c36,#555d50 , #3b3c36)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
                         whileHover={{
                          scale: 1.1,
                          textShadow: "0px 0px 8px rgb(255,255,255)",
                          boxShadow: "0px 0px 8px rgb(255,255,255)",
                          }} >Update Event</button>
                     
                       </form>
                     </div></center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              </tr> 
               ))}
          </tbody>
          </table>
      
              <button onClick={handleShowModal} className="btn btn-block mb-4" 
            style={{ marginLeft:'950px', marginTop:'10px',  backgroundColor:'black', borderColor:'black', borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
            whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
            }}>
            Add Event
          </button>

          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'80%'}}>
                       <form onSubmit={eventAdd}>
                     
                        <div className="form-outline mb-4"><br/>
                          <label className="form-label" htmlFor="loginName">Event Name</label>
                           <input type="text" id="loginName" className="form-control" onChange={(e) => setEventName(e.target.value)} />
                         </div>
                     
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginPassword">Description</label>
                           <input type="text" id="loginPassword" className="form-control" onChange={(e) => setDescription(e.target.value)}/>
                         </div>

                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginName">Event Time</label>
                           <input type="time" id="loginName" className="form-control" onChange={(e) => setTime(e.target.value)} />
                         </div>
                     
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginPassword">Event Venue</label>
                           <input type="text" id="loginPassword" className="form-control" onChange={(e) => setVenue(e.target.value)}/>
                         </div>

                         <label htmlFor="outTime" className="col-sm-5 col-form-label">Event Photo</label>
                            <div className="col-sm-8">
                            <input type="file" className="form-control"  
                            onChange={(e) => { handleCatImg(e) }}/>
                            </div>
                     <br/>
                         <button type="submit" className="btn btn-block mb-4" 
                         style={{ background: "linear-gradient(90deg, #3b3c36, #555d50 , #3b3c36,#555d50 , #3b3c36)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
                         whileHover={{
                          scale: 1.1,
                          textShadow: "0px 0px 8px rgb(255,255,255)",
                          boxShadow: "0px 0px 8px rgb(255,255,255)",
                          }} >Add Event</button>
                     
                       </form>
                     </div></center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer/>
        </div>
    )
}

export default AddEvent