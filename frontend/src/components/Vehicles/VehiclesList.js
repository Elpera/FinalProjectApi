import React, { useState, useEffect, useMemo, useRef } from "react";
import VehiclesDataService from "../../services/VehiclesService";
import { useTable } from "react-table";

const VehiclesList = (props) => {
  const [vehicles, setVehicles] = useState([]);
  const ownersRef = useRef();

  ownersRef.current = vehicles;

  useEffect(() => {
    retrieveOwners();
  }, []);

  const retrieveOwners = () => {
    VehiclesDataService.getAll()
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveOwners();
  };

  const openVehicles = (rowIndex) => {
    const id = ownersRef.current[rowIndex].id;
    props.history.push("/vehicles/edit/" + id);
  };

  const addClaim = (rowIndex) => {
    const id = ownersRef.current[rowIndex].id;
    props.history.push("/claims/add/" + id);
  };

  const deleteVehicles = (rowIndex) => {
    const id = ownersRef.current[rowIndex].id;

    VehiclesDataService.remove(id)
      .then((response) => {
        props.history.push("/vehicles");

        let newVehicles = [...ownersRef.current];
        newVehicles.splice(rowIndex, 1);

        setVehicles(newVehicles);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "VIN",
        accessor: "vin",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Owner ID",
        accessor: "owner_Id",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          const ownerId = props.row.owner_Id;
          return (
            <div className="actions-container">
              <span onClick={() => openVehicles(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteVehicles(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>

              <span onClick={() => addClaim(ownerId)}>
                <i className="fas fa-scroll action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: vehicles,
    });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button
            type="button"
            onClick={() => props.history.push("/vehicles/add")}
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;
