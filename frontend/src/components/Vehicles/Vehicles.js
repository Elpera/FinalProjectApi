import React, { useState, useEffect } from "react";
import VehicleDataService from "../../services/VehiclesService"; 

const Vehicle = props => {
  const initialVehiclesState = {
    id: null,
    brand: "",
    vin: "",
    color: "",
    year: "",
    ownerId: "",
  };
  
  

  const [currentVehicle, setCurrentVehicle] = useState(initialVehiclesState);
  const [message, setMessage] = useState("");

  const getVehicle = id => {
    VehicleDataService.get(id)
      .then(response => {
        setCurrentVehicle(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getVehicle(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentVehicle({ ...currentVehicle, [name]: value });
  };

  const updateVehicle = () => {
    VehicleDataService.update(currentVehicle.id, currentVehicle)
      .then(response => {
        console.log(response.data);
        setMessage("The Vehicle was updated successfully");
        props.history.push("/vehicles");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteVehicle = () => {
    VehicleDataService.remove(currentVehicle.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/vehicles");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentVehicle ? (
        <div className="edit-form">
          <h4>Vehicle</h4>
          <form>
          <div className="form-group">
              <label htmlFor="description">Drivers License</label>
              <input
                type="text"
                className="form-control"
                id="driversLicense"
                name="driversLicense"
                defaultValue={currentVehicle.ownerId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">First name</label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                name="firstName"
                defaultValue={currentVehicle.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Last name</label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                name="lastName"
                defaultValue={currentVehicle.lastName}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteVehicle}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateVehicle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Vehicle...</p>
        </div>
      )}
    </div>
  );
};

export default Vehicle;
