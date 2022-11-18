import React, { useState } from "react";
import OwnerDataService from "../../services/OwnersService";

const AddOwner = () => {
  const initialOwnerEntry = {
    id: null,
    firstName: "",
    lastName: "",
    driverLicence: ""
  };
  const [ownerEntry, setOwnerEntry] = useState(initialOwnerEntry);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setOwnerEntry({ ...ownerEntry, [name]: value });
  };

  const saveOwnerEntry = () => {
    var data = {
      firstName: ownerEntry.firstName,
      lastName: ownerEntry.lastName,
      driverLicence: ownerEntry.driverLicence
    };

    OwnerDataService.create(data)
      .then(response => {
        setOwnerEntry({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          driverLicence: response.data.driversLicense
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newOwnerEntry = () => {
    setOwnerEntry(initialOwnerEntry);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newOwnerEntry}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div><h4>Add Driver</h4></div>
          <div className="form-group">
            <label htmlFor="title">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              name="firstName"
              value={ownerEntry.firstName}
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
              value={ownerEntry.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Driver's License</label>
            <input
              type="text"
              className="form-control"
              id="driverLicence"
              name="driverLicence"
              value={ownerEntry.driverLicence}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={saveOwnerEntry} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddOwner;
