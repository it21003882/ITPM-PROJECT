import React,{useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios';
import './InsertForm.css';

export function InsertForm(){

    const[NIC,setNIC]=useState("");
    const[WasteType,SetWasteType]=useState([{ id: 1, waste: '' }]);
    const[ContactNo,SetContactNo]=useState("");
    const[Evidence,SetEvidence]=useState(null);

 
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

  const createUser=() => {
    axios.post('http://localhost:8000/report/save',{
        NIC:NIC,
        WasteType:WasteType.map((item) => item.waste),
        ContactNo:ContactNo,
        Evidence:Evidence,
    }).then((response) =>{
        setNIC(response.data.NIC);
        SetContactNo(response.data.ContactNo);
        SetEvidence(response.data.Evidence);
        SetWasteType(response.data.WasteType);

    }).catch((err) =>
    console.error(err)
    );


  }


  const formHandler=(event)=>{
    event.preventDefault();
    createUser();
    const main = {
        NIC:NIC,
        WasteType:WasteType.map((item) => item.waste),
        ContactNo:ContactNo,
        Evidence:Evidence,
    }

    console.log(main);


  }

  return (
    <div>
        <div className='form-grid'>
            <form onSubmit={formHandler}>
            <h2>Illegal dumping form</h2>
            <div class="mb-3" style={{}}>  

                        <label for="formGroupExampleInput" class="form-label">NIC</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" onChange={(event) => setNIC(event.target.value)} placeholder="Input NIC"/>
                    </div>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Contact number</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" onChange={(event) => SetContactNo(event.target.value)}placeholder="Input Contact no"/>
                    </div>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile02" onChange={(event) => SetEvidence(event.target.value)}/>
                        <label class="input-group-text" for="inputGroupFile02">Upload Evidence Here</label>
                    </div>

      {WasteType.map((WasteType,index) => (
        <div key={WasteType.id} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter waste types detected"   onChange={(event) => handleInputChange(event, index)}
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
      <input class="btn btn-primary" type="submit" onClick={formHandler} value="Submit"/>
      </form>
      
      </div>
    </div>
  );
}
