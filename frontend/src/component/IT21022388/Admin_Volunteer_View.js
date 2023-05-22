import React, { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect } from "react";
import AdminHeader from "../IT21003882/AdminHeader";
import Footer from "../IT21003882/FOoter";

function AdminVolunteerView() {

    const [full_name, setFullName] = useState("");
    const [email_address, setEmailAddress] = useState("");
    const [age, setAge] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [area, setArea] = useState("");
    const [event_name, setEventName] = useState("");
    const [status, setstatus] = useState("");

    const [volonteers,setVolonteers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const [userid, setUserId] = useState('');

    const {id} = useParams();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal1 = () => setShowModal1(false);

    useEffect(()=>{
      function getVolanteers(){
      axios.get("http://localhost:5000/volunteer/getall").then((res)=>{
        setVolonteers(res.data.payload);
          console.log(res.data.payload)
      }).catch((err)=>{
          alert(err.message);
      })
      }
      getVolanteers();
  },[volonteers])

    const deleteVolunteer = (e) =>{
      var result = window.confirm("Are you sure?");
    if(result == true){
        axios.delete(`http://localhost:5000/volunteer/delete/${e._id}`).then((res)=>{
        }).catch(e =>{
            alert(e)
        })
    }else{
        e.preventDefault();
    }
  
  }

  const  geteventDetails = (e) => {
    axios.get("http://localhost:5000/volunteer/get/"+e._id)
    .then((res) => {
      console.log(res.data.Vol)
      setFullName(res.data.Vol.full_name);
      setEmailAddress(res.data.Vol.email_address);
      setAge(res.data.Vol.age);
      setPhoneNumber(res.data.Vol.phone_number);
      setArea(res.data.Vol.area);
      setEventName(res.data.Vol.event_name);
    })
    .catch((err) => {
        alert(err.message);
    });
  }

    return (
        <div style={{fontFamily: 'Rockwell'}}>
            <AdminHeader/>

         <center><br/><h1>Volunteer Details</h1></center><br/>

        <table class="table table-bordered table-hover my-table" 
          style={{ width: '90%', float: 'left', marginLeft:'30px' }}>
            <thead >
              <tr>
                <th scope="col" style={{padding:'12px'}}>Name</th>
                <th scope="col" style={{padding:'12px'}}>Email</th>
                <th scope="col" style={{padding:'12px'}} >Phone Number</th>
                <th scope="col" style={{padding:'12px'}}>Event Name</th>
                <th scope="col" style={{padding:'12px'}}>Participation Status</th>
              </tr>
            </thead>
            <tbody>
            {volonteers.map(volonteer => ( 
              <tr>
                <td style={{padding:'12px'}}>{volonteer.full_name}</td>
                <td style={{padding:'12px'}}>{volonteer.email_address}</td>
                <td style={{padding:'12px'}}>{volonteer.phone_number}</td>
                <td style={{padding:'12px'}}>{volonteer.event_name}</td>
                <td style={{padding:'12px'}}>{volonteer.status}</td>
                {
                    volonteer.status == 'Yes'?
                    <div>
                        <Link to={`/certificate/${id}/${volonteer._id}`}>
                        <button  className="btn" style={{ backgroundColor:'black', borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease", fontSize: "12px", // Adjust the font size as desired
                        padding: "5px 10px"  }}
                        >E-Certificate</button></Link>
                    </div>
                    : null
                }
                <td style={{ border: "none" }}>
                  <button  className="btn" style={{ background: "linear-gradient(90deg, #008000, #008000 , #008000,#008000 ,#008000)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
                  onClick={
                    () => {
                      handleShowModal1();
                      geteventDetails(volonteer);
                    }
                    }>Update</button>
                </td>
                <td style={{ border: "none" }}>
                  <button  className="btn" style={{ background: "linear-gradient(90deg, #FF0000, #8B0000 , #FF0000,#8B0000 ,#FF0000)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }} 
                  onClick={() => {deleteVolunteer(volonteer)}} >Delete</button>
                </td>
                <Modal show={showModal1} onHide={handleCloseModal1}>
                <Modal.Header closeButton>
                <Modal.Title>Update Volunteer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
          <center>
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'80%'}}>
                       <form onSubmit={(e) => {
                            e.preventDefault();

                            const volunteer = {
                                full_name,
                                email_address,
                                age,
                                phone_number,
                                area,
                                event_name,
                                status
                            }
                                    
                            axios.put(`http://localhost:5000/volunteer/update/${volonteer._id}`, volunteer)
                            .then(() => {
                                toast.success('Volanteer Updated');
                                // navigate('/inventory');
                            })
                            .catch((err) => {
                                alert(err);
                            })
                        }}>
                     
                        <div className="form-outline mb-4"><br/>
                          <label className="form-label" htmlFor="loginName">Full Name</label>
                           <input type="text" id="loginName" className="form-control"  value={full_name} readOnly/>
                         </div>
                     
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginPassword">Email</label>
                           <input type="email" id="loginPassword" className="form-control" value={email_address} readOnly/>
                         </div>

                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginName">Age</label>
                           <input type="text" id="loginName" className="form-control" value={age} readOnly/>
                         </div>
                         
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginName">Event Name</label>
                           <input type="text" id="loginName" className="form-control" value={event_name} readOnly/>
                         </div>
                     
                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginPassword">Phone Number</label>
                           <input type="text" id="loginPassword" className="form-control" value={phone_number} readOnly/>
                         </div>

                         <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="loginName">Area</label>
                           <input type="text" id="loginName" className="form-control" value={area} readOnly/>
                         </div>
                        
                         <label className="form-label" htmlFor="loginName"> Participation Status</label>
                         <select className="form-outline mb-4" onChange={(e)=>{
                            setstatus(e.target.value);
                        }} >
                          <option value = "No"> Select One  
                        </option> 
                        <option value = "No"> No  
                        </option> 
                        <option value = "Yes"> Yes   
                        </option>  
                        </select>
                        

                        
                     <br/>
                         <button type="submit" className="btn btn-block mb-4" 
                         style={{ background: "linear-gradient(90deg, #3b3c36, #555d50 , #3b3c36,#555d50 , #3b3c36)", borderRadius: "20px", color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.4)", transition: "all 0.3s ease" }}
                         whileHover={{
                          scale: 1.1,
                          textShadow: "0px 0px 8px rgb(255,255,255)",
                          boxShadow: "0px 0px 8px rgb(255,255,255)",
                          }} >Update Volunteer</button>
                     
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
          <h1 style={{color:'white'}}>Admin</h1><br/>
          <Footer/>
        </div>
    )
}

export default AdminVolunteerView