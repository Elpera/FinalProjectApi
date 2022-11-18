import React, { useState, useEffect } from "react";
import OwnerDataService from "../../services/OwnersService"; 

const Owner = props => {
  const initialOwnerState = {
    id: null,
    firstName: "",
    lastName: "",
    driversLicense: "",
  };
  
  

  const [currentOwner, setCurrentOwner] = useState(initialOwnerState);
  const [message, setMessage] = useState("");

  const getOwner = id => {
    OwnerDataService.get(id)
      .then(response => {
        setCurrentOwner(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOwner(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentOwner({ ...currentOwner, [name]: value });
  };

  const updateOwner = () => {
    OwnerDataService.update(currentOwner.id, currentOwner)
      .then(response => {
        console.log(response.data);
        setMessage("The Owner was updated successfully");
        props.history.push("/owners");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteOwner = () => {
    OwnerDataService.remove(currentOwner.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/owners");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentOwner ? (
        <div className="edit-form">
          <h4>Owner</h4>
          <form>
          <div className="form-group">
              <label htmlFor="description">Drivers License</label>
              <input
                type="text"
                className="form-control"
                id="driversLicense"
                name="driversLicense"
                defaultValue={currentOwner.email}
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
                defaultValue={currentOwner.firstName}
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
                defaultValue={currentOwner.lastName}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteOwner}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateOwner}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Owner...</p>
        </div>
      )}
    </div>
  );
};

export default Owner;
