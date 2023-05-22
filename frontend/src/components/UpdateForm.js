
import React,{useState} from "react";

export function UpdateForm(){

    const[nic,setNIC]=useState("");
    const[wasteType,SetWasteType]=useState([{ id: 1, waste: '' }]);
    const[contactNo,SetContactNo]=useState("");
    const[Evidence,SetEvidence]=useState(null);

 
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


  

  const formHandler=(event)=>{
    event.preventDefault();
    const main = {
        nic:nic,
        wasteType:wasteType.map((item) => item.waste),
        contactNo:contactNo,
        Evidence:Evidence,
    }

    console.log(main);


  }

  return (
    <div>
        <div className='form-grid'>
            <form onSubmit={formHandler}>
            <h2>Update dumping form</h2>
            <div class="mb-3">
                        <label for="formGroupExampleInput" class="form-label">NIC:</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" onChange={(event) => setNIC(event.target.value)} placeholder="Example input placeholder"/>
                    </div>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">contactNo:</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" onChange={(event) => SetContactNo(event.target.value)}placeholder="Another input placeholder"/>
                    </div>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile02" onChange={(event) => SetEvidence(event.target.value)}/>
                        <label class="input-group-text" for="inputGroupFile02">Upload</label>
                    </div>

      {wasteType.map((wasteType,index) => (
        <div key={wasteType.id} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"   onChange={(event) => handleInputChange(event, index)}
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
      <input class="btn btn-primary" type="submit" onClick={formHandler} value="Submit"/>
      </form>
      </div>
    </div>
  );
}