import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Footer from "./FOoter";

function Admin_Donate() {

    const {id} = useParams();
    const [donates,setDonate] = useState([]);
   
    useEffect(()=>{
        function getEvenets(){
        axios.get("http://localhost:5000/donate/getall").then((res)=>{
            setDonate(res.data.payload);
            console.log(res.data.payload)
        }).catch((err)=>{
            alert(err.message);
        })
        }
        getEvenets();
    },[donates])

    const deleteDonate = (e) =>{
        var result = window.confirm("Are you sure?");
      if(result == true){
          axios.delete(`http://localhost:5000/donate/delete/${e._id}`).then((res)=>{
          }).catch(e =>{
              alert(e)
          })
      }else{
          e.preventDefault();
      }
    
    }
    //serach 
    const [serQuary,setSerQuary]=useState("");

    function searchEmployee(event){
          setSerQuary(event.target.value);
    }

    return (
        <div style={{fontFamily: 'Rockwell'}}>
            <AdminHeader/> <br/>
            <input onChange={searchEmployee}  placeholder="Search....." style={{marginRight:'1000px'}}/>
            <h1>Donation Details</h1>
                        <Button style={{marginLeft:'1000px'}}
                        variant="primary"
                        onClick={() => {
                        window.print();
                        }}>
                        Print Report
                        </Button> <br/><br/>
            <table class="table table-bordered table-hover my-table" 
            style={{ width: '90%', float: 'left', marginLeft:'30px' }}>
            <thead >
              <tr>
                <th scope="col" style={{padding:'12px'}}>Name</th>
                <th scope="col" style={{padding:'12px'}}>Email</th>
                <th scope="col" style={{padding:'12px'}}>Description</th>
                <th scope="col" style={{padding:'12px'}}>Amount</th>
              </tr>
            </thead>
            <tbody>
            {donates.filter(donate=>

              donate.full_name.toLowerCase().includes(serQuary) ||
              donate.full_name.includes(serQuary) ||
              donate.email.toLowerCase().includes(serQuary) ||
              donate.email.includes(serQuary) 

              ).map(donate => ( 
              <tr>
                <td style={{padding:'12px'}}>{donate.full_name}</td>
                <td style={{padding:'12px'}}>{donate.email}</td>
                <td style={{padding:'12px'}}>{donate.donate_description}</td>
                <td style={{padding:'12px'}}>{donate.amount}</td>
                <td style={{ border: "none" }}>
                  <Link to={`/admin/updatedonation/${donate._id}`}><button  className="btn" style={{ background: "black", color: "white"}}>Update</button></Link>
                </td>
                <td style={{ border: "none" }}>
                  <button  className="btn" style={{ background: "red", color: "white"}} 
                  onClick={()=>{deleteDonate(donate)}}>Delete</button>
                </td>
                
              </tr> 
               ))}
          </tbody> <br/>
          </table>
           <br/>
           <h1 style={{color:'white'}}>Admin</h1>
           <Footer/>
        </div>
    )
}

export default Admin_Donate