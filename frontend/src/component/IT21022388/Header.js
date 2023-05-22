import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";

function Header() {

    const {id} = useParams();

    return (
        <div style={{fontFamily: 'Rockwell'}}>
            <p style={{backgroundColor:'black', color:'whitesmoke', marginTop:'-2px',padding:'5px'}}>3R's Recycling Service</p>
            <div>
                <img src="https://danoinc.com/wp-content/uploads/2013/09/reduce-reuse-recycle-globe.png"
                style={{marginRight:'1150px', marginTop:'-10px'}} width={'8%'}/>
                <div style={{marginRight:'650px',marginTop:'-80px'}}>
                    <h2>3R's Recycling Service</h2>
                    <p style={{marginRight:'135px',marginTop:'-10px'}}>for a better future</p>
                </div>
                <div style={{marginTop:'-60px'}}>
                    <Link to={``}>
                    <div style={{marginLeft:'1050px', marginTop:'-35px', color:'black'}}>
                     <FontAwesomeIcon icon={faUser} size="2x"/>
                    </div>
                    </Link>
                    <div style={{marginLeft:'1180px', marginTop:'-35px'}}>
                     <FontAwesomeIcon icon={faShoppingCart} size="2x"/>
                    </div>
                    
                </div>
                <div style={{backgroundColor:'#006400 ', marginTop:'40px'}}>
                    <ul style={{ listStyle: 'none', display: 'flex', fontWeight :'bold', fontSize:'20px', padding:'5px' }}>
                        <Link to={`/home/${id}`} style={{ textDecoration: 'none',color:'white' }}><li style={{ marginLeft: '90px' }}>Home</li> </Link>
                        <Link to={`/event/${id}`} style={{ textDecoration: 'none', color:'white' }}><li style={{ marginLeft: '150px' }}>Events</li></Link>
                        <Link to={`/#`} style={{ textDecoration: 'none',color:'white' }}><li style={{ marginLeft: '150px' }}>Products</li></Link>
                        <Link to={`/#`} style={{ textDecoration: 'none',color:'white' }}><li style={{ marginLeft: '150px' }}>Management Centers</li></Link>
                        <Link to={`/donation/${id}`} style={{ textDecoration: 'none',color:'white' }}><li style={{ marginLeft: '150px' }}>Donate</li></Link>
                    </ul>
                </div>

            
            </div>
        </div>
    )
}

export default Header