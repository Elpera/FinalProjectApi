import React, { useState } from "react";
import TutorialDataService from "../../services/VehiclesService"

const AddVehicles = () => {
  const initialVehicleEntry = {
    id: null,
    brand: "",
    vin: "",
    color: "",
    year: "",
    ownerId: "",
  };
  const [vehicleEntry, setVehicleEntry] = useState(initialVehicleEntry);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setVehicleEntry({ ...vehicleEntry, [name]: value });
  };

  const saveVehicleEntry = () => {
    var data = {
      brand: vehicleEntry.brand,
      lastName: vehicleEntry.lastName,
      email: vehicleEntry.email,
      phoneNumber: vehicleEntry.phoneNumber
    };

    TutorialDataService.create(data)
      .then(response => {
        setVehicleEntry({
          brand: response.data.brand,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newVehicleEntry = () => {
    setVehicleEntry(initialVehicleEntry);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newVehicleEntry}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={vehicleEntry.brand}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              name="lastName"
              value={vehicleEntry.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={vehicleEntry.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone-number"
              name="phoneNumber"
              required
              onChange={handleInputChange}
              value={vehicleEntry.phoneNumber}
            />
          </div>

          <button onClick={saveVehicleEntry} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default AddVehicles