import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import './assests/UpdateUserForm.css';
import Header from '../IT21022388/Header';
import Footer from '../IT21003882/FOoter';

import { storage } from '../../config/firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function UserFormUpdate() {
  const [nic, setNIC] = useState('');
  const [wasteType, SetWasteType] = useState([{ id: 1, waste: '' }]);
  const [contactNo, SetContactNo] = useState('');
  const [EvidenceUrl, setEvidenceUrl] = useState('');

  const [contactNoError, setContactNoError] = useState('');
  const [nicError, setNICError] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const navigate = useNavigate();

  //check validity of nic and contact no

  const validateForm = () => {
    let isValid = true;

    // Validate NIC
    if (nic.trim() === '') {
      setNICError('NIC is required');
      isValid = false;
    } else {
      setNICError('');
    }

    // Validate contact number
    if (contactNo.trim() === '') {
      setContactNoError('Contact number is required');
      isValid = false;
    } else {
      setContactNoError('');
    }

    // Add validation for other input fields if needed

    return isValid;
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/report/' + id);
      if (response?.status >= 200 && response?.status < 300) {
        // successful response
        setNIC(response.data.NIC);
        SetContactNo(response.data.ContactNo);
      }
    } catch (error) {}
  };

  const handleAddInputField = () => {
    const newwasteType = [...wasteType, { id: wasteType.length + 1 }];
    SetWasteType(newwasteType);
  };

  const handleRemoveInputField = (id) => {
    const newwasteType = wasteType.filter((field) => field.id !== id);
    SetWasteType(newwasteType);
  };

  //handle waste type
  const handleInputChange = (event, index) => {
    const newwasteType = [...wasteType];
    newwasteType[index].waste = event.target.value;
    SetWasteType(newwasteType);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log('click update button');
    try {
      if (validateForm()) {
        const response = await axios.put(
          `http://localhost:5000/report/update/` + id,
          {
            NIC: nic,
            WasteType: '',
            ContactNo: contactNo,
            Evidence: EvidenceUrl,
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          // successful response
          console.log('Response is successful');
          console.log(response);
          navigate(`../userform`);
        } else {
          // unsuccessful response
          console.log('Error: ' + response.status + ' ' + response.statusText);
        }
      }
    } catch (error) {
      console.log('updation faild');
    }
  };

  //firebase image handling
  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const EvidenceUrl = await getDownloadURL(snapshot.ref);
      setEvidenceUrl(EvidenceUrl);
      console.log('Image uploaded successfully:', EvidenceUrl);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <div className="bg">
      <Header />
      <div className="form-grid">
        <form onSubmit={updateHandler}>
          <h1>Update dumping form</h1>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label"></label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              onChange={(event) => setNIC(event.target.value)}
              value={nic}
              placeholder="Enter NIC here"
            />
            {nicError && (
              <div
                className="error"
                style={{ fontSize: '30px', color: 'yellow' }}
              >
                {nicError}
              </div>
            )}
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label"></label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              onChange={(event) => SetContactNo(event.target.value)}
              value={contactNo}
              placeholder="Enter contact no here"
            />
            {contactNoError && (
              <div
                className="error"
                style={{ fontSize: '30px', color: 'yellow' }}
              >
                {contactNoError}
              </div>
            )}
          </div>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              id="inputGroupFile02"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <label class="input-group-text" for="inputGroupFile02">
              Upload
            </label>
          </div>

          {wasteType.map((wasteType, index) => (
            <div key={wasteType.id} className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add waste types here"
                onChange={(event) => handleInputChange(event, index)}
                aria-label="Recipient's username with two button addons"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddInputField}
              >
                More
              </button>
              {wasteType.length > 1 && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleRemoveInputField(wasteType.id)}
                >
                  Less
                </button>
              )}
            </div>
          ))}
          <input class="btn btn-primary" type="submit" value="Update" />
        </form>
      </div>
      <Footer />
    </div>
  );
}
export default UserFormUpdate;
