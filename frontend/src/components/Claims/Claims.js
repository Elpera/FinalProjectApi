import React, { useState, useEffect } from "react";
import ClaimDataService from "../../services/ClaimsService"; 

const Claim = props => {
  const initialClaimState = {
    id: null,
    description: "",
    status: "",
    date: "",
    vehicle_Id: null
  };
  
  

  const [currentClaim, setCurrentClaim] = useState(initialClaimState);
  const [message, setMessage] = useState("");

  const getClaim = id => {
    ClaimDataService.get(id)
      .then(response => {
        setCurrentClaim(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClaim(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentClaim({ ...currentClaim, [name]: value });
  };

  const updateClaim = () => {
    ClaimDataService.update(currentClaim.id, currentClaim)
      .then(response => {
        console.log(response.data);
        setMessage("The Claim was updated successfully");
        props.history.push("/claims");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteClaim = () => {
    ClaimDataService.remove(currentClaim.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/claims");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentClaim ? (
        <div className="edit-form">
          <h4>Claim</h4>
          <form>
          <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                defaultValue={currentClaim.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                defaultValue={currentClaim.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                max="2025-12-31"
                defaultValue={currentClaim.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Vehicle Id</label>
              <input
                type="number"
                className="form-control"
                id="vehicle_Id"
                name="vehicle_Id"
                defaultValue={currentClaim.vehicle_Id}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteClaim}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateClaim}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Claim...</p>
        </div>
      )}
    </div>
  );
};

export default Claim;
