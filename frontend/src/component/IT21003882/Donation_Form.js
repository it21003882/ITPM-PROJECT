import React, { useState } from "react";
import Header from "../IT21022388/Header";
import {
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
  } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast'
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import Footer from "./FOoter";

function Donation() {

    const {id} = useParams();
    const [full_name, setFUllName] = useState('');
    const [email, setEmail] = useState('');
    const [donate_description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const addDonation = (e) => {
     
        e.preventDefault();
        console.log("Hi")
        if (full_name === '') {
          
            toast.error("Please Provide Full Name..!", {
                id: "email"
            })
        }
        else if (email === '') {
          
            toast.error("Please Provide the Email..!", {
                id: "'password'"
            })
        }
        else if (donate_description === '') {
           
            toast.error("Please provide the Donate Desciption...!", {
                id: "credential"
            })
        }
        else if (amount === '') {
           
            toast.error("Please provide the amount...!", {
                id: "credential"
            })
        }
    
        else if (full_name !== '' && email !== '' && donate_description !== '' && amount !== '' ) {
            const donate = {
                full_name,
                email,
                donate_description,
                amount
            }
    
    
            const uid = axios.post("http://localhost:5000/donate/add",donate).then((response)=>{
                toast.success("Donation Added Successfully!");
                // const uid = response.data.payload.uid; 
                // console.log(uid);;
                // alert('ok')
                // navigate('/home/'+uid);
            }).catch(() => {
              alert('Not ok')
                toast.error("Something Went Wrong!")
            }).finally(() => {
              setIsLoading(false); // Stop loading animation
          });

           
        }
    }

    const [product,setProduct] = useState({
        name:"React form FB",
        price:10,
        productBy:"facebokk"
      })
    
      const makePayament = token => {
        const body = {
          token,
          product
        }
        const header = {
          "Content-Type":"application/json"
        }
        return fetch(`http://localhost:5000/payment`,{
          method:"POST",
          header,
          body: JSON.stringify(body)
        }).then(response => {
          console.log("Responser", response)
          const {status} = response;
         // navigate('/dash');
          console.log("Status",status)
        }).catch(error => console.log(error))
      }

    return (
      <div><Header/>

        <div style={{fontFamily: 'Rockwell', backgroundImage:'url(https://media.istockphoto.com/id/1186054240/vector/power-and-energy-related-seamless-pattern.jpg?s=612x612&w=is&k=20&c=o3DoCkzvfn85fx78_DTkRUvsc92sVYLnLcxt7e4IxoY=)'}}>

        <button
                type="submit"
                className="btn btn-block mb-4"
                style={{
                    fontSize: "1.2rem",
                    background: "linear-gradient(90deg, #008000, #008000 , #008000,#008000 , #008000)",
                    borderRadius: "20px",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                    transition: "all 0.3s ease"
                }}
                disabled={isLoading} // Disable the button while loading
            >
                {isLoading ? "Loading..." : ""} {/* Display different text while loading */}
            </button>
            
            <center><h1 style={{backgroundColor:'white', width:'30%'}}>Donation Form<br/></h1></center><br/>
           <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{marginLeft:'80px'}}> <br/>
          
            <MDBCol>
            <MDBCard style={{ border: "none" }}>
            <MDBCardBody>
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style={{width:'100%', backgroundColor:'#A9A9A9', marginLeft:'0px', borderRadius:'10px'}}>
                       <form onSubmit={addDonation}> <br/>
                     
                       <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}><br/>
                           <input type="text" id="loginName" className="form-control" onChange={(e) => setFUllName(e.target.value)} />
                           <label className="form-label" htmlFor="loginName">Full Name</label>
                         </div>
                     
                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="email" id="loginPassword" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                           <label className="form-label" htmlFor="loginPassword">Email</label>
                         </div>

                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="text" id="loginName" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                           <label className="form-label" htmlFor="loginName">Donate Description</label>
                         </div>
                     
                         <div className="form-outline mb-4" style={{width:'90%', marginLeft:'20px'}}>
                           <input type="number" id="loginPassword" className="form-control" onChange={(e) => setAmount(e.target.value)}/>
                           <label className="form-label" htmlFor="loginPassword">Amount</label>
                         </div>
                         <center><hr style={{width:'60%'}}/></center>
                         
                         Pay With <img src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png" width={'10%'} /><br/>

                         <StripeCheckout
                            stripeKey="pk_test_51N0lfXFXk7msLsjQ5LRsPNV0fOS4fsI7haCe6vQ4GZ5xxC3fbFHDtVl1rU7QwUNewA9qOIHJ1tu8MiWVSR4IZrcK00RvTA8Pq2"
                            token={makePayament}
                            name="Donate"
                            amount={amount*100}>
                            <button className='btn btn-primary mt-2'>Pay $<span class="fas fa-dollar-sign px-1"></span>{amount}</button>
                        </StripeCheckout><br/><br/>

                       </form>
                     </div>
                     
           
            </MDBCardBody> 
            </MDBCard>
            </MDBCol>
      
           
        </MDBRow>
        <img src="https://th.bing.com/th/id/R.3173e0cb437fc0ae132afb67cfb2b1f3?rik=4PSAlHKOSibEww&pid=ImgRaw&r=0" width={'55%'} style={{borderRadius:'30px', marginLeft:'470px',marginTop:'-660px'}}/>
        <Footer/>
        </div></div>
    )
}

export default Donation