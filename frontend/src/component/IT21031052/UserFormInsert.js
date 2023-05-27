import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './assests/InsertUserForm.css';

import Header from '../IT21022388/Header';
import Footer from '../IT21003882/FOoter';

import { storage } from '../../config/firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';

function UserFormInsert() {
  const navigate = useNavigate();

  const [NIC, setNIC] = useState('');
  const [WasteType, SetWasteType] = useState([{ id: 1, waste: '' }]);
  const [ContactNo, SetContactNo] = useState('');
  const [EvidenceUrl, setEvidenceUrl] = useState('');

  const handleAddInputField = () => {
    const newwasteType = [...WasteType, { id: WasteType.length + 1 }];
    SetWasteType(newwasteType);
  };

  const handleRemoveInputField = (id) => {
    const newwasteType = WasteType.filter((field) => field.id !== id);
    SetWasteType(newwasteType);
  };

  //handle waste type
  const handleInputChange = (event, index) => {
    const newwasteType = [...WasteType];
    newwasteType[index].waste = event.target.value;
    SetWasteType(newwasteType);
  };

  //Delete form

  const createUser = () => {
    axios
      .post('http://localhost:5000/report/save', {
        NIC: NIC,
        WasteType: WasteType.map((item) => item.waste),
        ContactNo: ContactNo,
        Evidence: EvidenceUrl,
      })
      .then((response) => {
        setNIC(response.data.NIC);
        SetContactNo(response.data.ContactNo);
        setEvidenceUrl(response.data.EvidenceUrl);
        SetWasteType(response.data.WasteType);
      })
      .catch((err) => console.error(err));
  };

  const formHandler = (event) => {
    event.preventDefault();
    createUser();
    navigate('/form/:id');
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const EvidenceUrl = await getDownloadURL(snapshot.ref);
      console.log(EvidenceUrl);
      setEvidenceUrl(EvidenceUrl);
      console.log('Image uploaded successfully:', EvidenceUrl);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <div className="main">
      <Header />
      <div className="user-insert-bg">
        <h1>Illegal dumping form</h1>
        <form onSubmit={formHandler}>
          <div class="mb-3" style={{}}>
            <label for="formGroupExampleInput" class="form-label"></label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              onChange={(event) => setNIC(event.target.value)}
              placeholder="Input NIC"
            />
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label"></label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              onChange={(event) => SetContactNo(event.target.value)}
              placeholder="Input Contact no"
            />
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
              Upload Evidence Here
            </label>
          </div>

          {WasteType.map((WasteType, index) => (
            <div key={WasteType.id} className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter waste types detected"
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
              {WasteType.length > 1 && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleRemoveInputField(WasteType.id)}
                >
                  Less
                </button>
              )}
            </div>
          ))}
          <input class="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
      <Footer />
    </div>
  );
}
export default UserFormInsert;
