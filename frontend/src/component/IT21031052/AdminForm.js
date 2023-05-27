import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useParams, useNavigate } from 'react-router-dom';

import Header from '../IT21003882/AdminHeader';
import Footer from '../IT21003882/FOoter';
import './assests/AdminForm.css';

function AdminForm() {
  const [NIC, setNIC] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [Evidence, setEvidence] = useState('');
  const [wasteType, setWasteType] = useState([]);

  const [formList, setFormList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/report/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        alert('Deleted successfully!');
        fetchFormData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  //Search function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredFormList = formList.filter((form) =>
      String(form.NIC).includes(e.target.value)
    );
    setFormList(filteredFormList);
  };

  const handleReset = () => {
    setSearchQuery('');
    fetchFormData();
  };

  const fetchFormData = () => {
    axios
      .get('http://localhost:5000/report/')
      .then((response) => {
        setFormList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <Header /> {/*below display data should be into table*/}
        <div className="admin-background">
          <h1>Form Data</h1>

          <form className="d-flex mb-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by NIC"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
            />

            <button
              className="btn btn-outline-success me-2"
              type="submit"
              style={{
                color: 'yellow',
                fontWeight: 'bold',
                fontSize: 'large',
                marginLeft: '10%',
                marginRight: '20%',
              }}
            >
              Search
            </button>
            <button
              className="btn btn-outline-secondary"
              style={{ color: 'yellow', fontWeight: 'bold', fontSize: 'large' }}
              onClick={handleReset}
            >
              Reset
            </button>
          </form>

          <div className="admin-form-bg">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">NIC</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Waste Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formList.map((form) => (
                  <tr key={form._id}>
                    <td>{form.NIC}</td>
                    <td>{form.ContactNo}</td>
                    <td>
                      <ul className="remove-btn">
                        {form.WasteType.map((type, index) => (
                          <li key={index}>{type}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(form._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/map/search">
            <button type="button" class="btn btn-primary">
              Click to view management centers
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default AdminForm;
