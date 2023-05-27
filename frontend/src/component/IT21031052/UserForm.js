import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assests/UserForm.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

import UserMap from './UserMap';

import Header from '../IT21022388/Header';
import Footer from '../IT21003882/FOoter';

function UserForm() {
  const navigate = useNavigate();
  const [NIC, setNIC] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [EvidenceUrl, setEvidenceUrl] = useState('');
  const [wasteType, setWasteType] = useState([]);

  const [formList, setFormList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/report/`)
      .then((response) => {
        //console.log(response.data)
        setFormList(response.data);
        console.log(formList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="userForm">
        <h1 className="font">Form Data</h1>
        {formList.map((form) => (
          <div className="form-border" key={form.id}>
            {form.Evidence && (
              <img
                className="evidanceImage"
                src={form.Evidence}
                alt="jajajaj"
              />
            )}
            <p>
              <h3>NIC:{form.NIC}</h3>
            </p>
            <p>
              <h3>Contact no:{form.ContactNo}</h3>
            </p>
            <ul className="remove-btn">
              <h3> Type of Waste:</h3>
              {form.WasteType.map((type, index) => (
                <li key={index}>
                  <h4> {type}</h4>
                </li>
              ))}
            </ul>

            <>
              <button
                class="btn btn-success"
                style={{ marginRight: '100px' }}
                onClick={() => {
                  navigate(`/form/update?id=${form._id}`);
                }}
              >
                Update
              </button>

              {/*<button class="btn btn-success" 
                        style={{marginRight:"100px"
                        }}
                        onClick={() => handleUpdate(form.id)}>Update</button>
                    */}
            </>

            <Link to="/form/insert/:id">
              <button type="button" class="btn btn-primary">
                Insert
              </button>
            </Link>
          </div>
        ))}
        <Link to="/map/search">
          <button type="button" class="btn btn-primary">
            management centers
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
export default UserForm;
