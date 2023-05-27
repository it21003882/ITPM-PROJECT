import React from 'react';
import './assest/style_Certificate.css';
import i1 from './images/s6.png';
import i3 from './images/s3.png'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function Certificate() {

  const {id,eid} = useParams();

      const [full_name,setFUllName] = useState('');
      const [event_name,setEventName] = useState('');
      const [email,setEmail] = useState('');

      const currentDate = new Date();

      const getVolunteer = () => {
        console.log("hi")
        axios.get(`http://localhost:5000/volunteer/get/${eid}`).then((res)=>{

        setFUllName(res.data.Vol.full_name);
        setEventName(res.data.Vol.event_name);
        setEmail(res.data.Vol.email_address);
        console.log(res.data.Vol)
           
        }).catch((err)=>{
            alert(err.message);
        })
        }

        useEffect(() => getVolunteer(), []);

        const addCertificate = () =>{

        }


  return (
    <><br/>
    <Button style={{marginLeft:'900px'}}
                        variant="primary"
                        onClick={() => {
                        window.print();
                        }}
                    >
                        Print Report
                    </Button> 
    <Link to={`/admin/volanteer/${id}`}><Button style={{paddingLeft:'10px'}}>Back</Button></Link>
    <div className='divbody'>
        <div class="border-pattern">
            <div class="content">
              <div class="inner-content">
                <h2 className='divh2'>Volunteer E-Certificate</h2>
                <h3 className='divh3'>This certificate of appreciation is awarded to :</h3>
                <p className='divp'>{full_name}</p>
                <p className='divp' style={{ marginTop:'-30px'}}>......................................</p>
                <h3 className='divh3'>In recognition of your contributions to : </h3>
                <p className='divp' >{event_name}</p>
                <h3 className='divh3'>Congratulation!</h3>
                <p className='divp' >Thank you for sharing your talents.</p>
                <h3 className='divh3'>On</h3>
                <p className='divp'>{currentDate.toLocaleDateString()}</p>
                <div>
                  <div style={{marginLeft:'650px'}}>
                  <img src={i3}  width={'50%'} style={{marginTop:'-200px'}} />
                  <p className='divp' style={{fontSize:'15px', marginTop:'-120px'}}> ....................<br/>Dr.Danuka Bandara<br/> Sustainable Tourism Coordinator,<br/> 3R's Cycling.</p>
                  </div>
                 
                  <img src={i1}  width={'20%'} style={{marginTop:'-180px', marginRight:'650px'}}/>
                </div>
              </div>
            </div>
        </div>
        
        </div>
    </>
  );
}
