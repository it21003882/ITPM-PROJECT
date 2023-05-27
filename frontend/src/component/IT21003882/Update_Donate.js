import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../IT21022388/Header";
import Footer from "./FOoter";
import {
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
  } from 'mdb-react-ui-kit';

function UpdateDonate() {

    const [full_name, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [donate_description, setDonateDescription] = useState('')
    const [amount, setAmount] = useState('')
    const navigate = useNavigate();
    
    const {id} = useParams();
    
    const getDonate = () => {
        axios.get("http://localhost:5000/donate/get/"+id)
        .then((res) => {
            const donate = {
                full_name: res.data.Vol.full_name,
                email: res.data.Vol.email,
                donate_description: res.data.Vol.donate_description,
                amount: res.data.Vol.amount
            }

            console.log(res.data.Vol);
            setFullName(donate.full_name);
            setEmail(donate.email);
            setDonateDescription(donate.donate_description);
            setAmount(donate.amount);
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    useEffect(() => getDonate(), []);

    return (
          <div  style={{fontFamily: 'Rockwell'}}>
            <Header/>
            <h1><br/>Update Donate</h1>
            <div className="form-style-5"> 
            <form  onSubmit={(e) => {
                            e.preventDefault();

                            
                        const newDonate = {
                            full_name, 
                            email,
                            donate_description,
                            amount
                            }
                                    
                            axios.put("http://localhost:5000/donate/update/"+id, newDonate)
                            .then(() => {
                                toast.success('Donate Updated');
                               // navigate('/inventory');
                            })
                            .catch((err) => {
                                alert(err);
                            })
                        }}>
                
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
          
          <MDBCol>
          <MDBCard style={{ border: "none" }}>
          <MDBCardBody>
          <br/> <br/>
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'100%', backgroundColor:'#A9A9A9', marginLeft:'30px', borderRadius:'10px'}}>
                    <br/>
                   
                     <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}><br/>
                         <input type="text" value={full_name} id="loginName" className="form-control" onChange={(e) => setFullName(e.target.value)} />
                         <label className="form-label" htmlFor="loginName">Full Name</label>
                       </div>
                   
                       <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                         <input type="email" value={email} id="loginPassword" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                         <label className="form-label" htmlFor="loginPassword">Email</label>
                       </div>

                       <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                         <input type="text" value={donate_description} id="loginName" className="form-control" onChange={(e) => setDonateDescription(e.target.value)} />
                         <label className="form-label" htmlFor="loginName">Donate Description</label>
                       </div>
                   
                       <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                         <input type="number" value={amount} id="loginPassword" className="form-control" onChange={(e) => setAmount(e.target.value)} readOnly/>
                         <label className="form-label" htmlFor="loginPassword">Amount</label>
                       </div>
                       <center><hr style={{width:'60%'}}/></center>
                       <button type="submit" className="btn btn-dark" >Submit</button> <br/><br/>
                   </div>
                  
         
          </MDBCardBody> 
          </MDBCard>
          </MDBCol>
    
         
      </MDBRow>
            
                </form><br></br>
                </div>
                <img src="https://loveincorporated.blob.core.windows.net/contentimages/main/c399c30d-e54a-4aa4-807b-1746712ef114-dividends-investing-pots-shutterstock.jpg" width={'55%'} style={{borderRadius:'30px', marginLeft:'470px',marginTop:'-550px'}}/>
                <Footer/>
                </div>
                
    );
};

export default UpdateDonate;