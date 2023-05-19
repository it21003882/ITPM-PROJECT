import React,{useEffect, useState} from "react";
import axios from "axios";
import './Form.css';
import {useParams} from 'react-router-dom';
export function Form(){

    const [NIC, setNIC] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [Evidence, setEvidence] = useState("");
  const [wasteType, setWasteType] = useState([]);

  const[formList,setFormList]=useState([]);

  const {id}=useParams();

  const handleUpdate=()=>{
    axios.put(`http://localhost:8000/report/update/${id}`)
    .then((response)=>{
        console.log(response.data);
        alert('Updated successfully!')
    }).catch((error)=>{
        console.log(error);
    })

  }
  const handleDelete=()=>{
    axios.delete(`http://localhost:8000/report/delete/${id}`)
    .then((response)=>{
        console.log(response.data);
        alert('Deleted successfully!')
    }).catch((error)=>{
        console.log(error);
    })

  }

  useEffect(() => {
    axios.get('http://localhost:8000/report/')
    .then((response)=>{
        //console.log(response.data)
        setFormList(response.data);
    })
    .catch((error)=>{
        console.log(error);
    });

  },[]);

    return(
            <div>
                <div className="box-grid">
                    <h3>Form Data</h3>
                {
                    formList.map(form=>
                        <div className="form-border" key={form.id}>
                            
                            {form.Evidence && <img src={form.Evidence}  />}
                        {form.Evidence && <p>Image URL: {form.Evidence}</p>}
                            <p><h3>NIC:{form.NIC}</h3></p>
                            <p><h3>Contact no{form.ContactNo}</h3></p>
                            <ul className="remove-btn">
                                Type of Waste:
                                {form.WasteType.map((type,index)=>(
                                    <li key={index}><h3> {type}</h3> </li>
                                ))}
                            </ul>

                            <><button class="btn btn-success" 
                        style={{marginRight:"100px"
                        }}onClick={() => handleUpdate(form.id)}>Update</button>
                        
                        <button class="btn btn-danger" 
                        style={{marginLeft:"100px"
                        }} onClick={() => handleDelete(form.id)}>Delete</button></>            
                            
                        </div>
                        
                        )
                }
                    

            
    
                
    </div>
        
   </div> 

    )
}

