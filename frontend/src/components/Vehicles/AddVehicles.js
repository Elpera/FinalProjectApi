import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VehiclesDataService from "../../services/VehiclesService"

const AddVehicles = (inputId) => {
  const urlParams = useParams();

  const initialVehicleEntry = {
    id: null,
    brand: "",
    vin: "",
    color: "",
    year: "",
    owner_Id: urlParams.id
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
      vin: vehicleEntry.vin,
      color: vehicleEntry.color,
      year: vehicleEntry.year,
      owner_Id: vehicleEntry.owner_Id
    };

    VehiclesDataService.create(data)
      .then(response => {
        setVehicleEntry({
          id: response.data.id,
          brand: response.data.brand,
          vin: response.data.vin,
          color: response.data.color,
          year: response.data.year,
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
          <div><h4>Add Vehicle to Driver</h4></div>
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
            <label htmlFor="description">VIN</label>
            <input
              type="text"
              className="form-control"
              id="vin"
              name="vin"
              value={vehicleEntry.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Color</label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
              onChange={handleInputChange}
              value={vehicleEntry.color}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Year</label>
            <input
              type="text"
              className="form-control"
              id="year"
              name="year"
              required
              onChange={handleInputChange}
              value={vehicleEntry.year}
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