import React, { useState, useEffect, useMemo, useRef } from "react";
import VehicleDataService from "../../services/VehiclesService";
import { useTable } from "react-table";

const VehicleList = (props) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchOwnerId, setSearchOwnerId] = useState("");
  const vehiclesRef = useRef();

  vehiclesRef.current = vehicles;

  useEffect(() => {
    retrieveVehicles();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchOwnerId(searchTitle);
  };

  const retrieveVehicles = () => {
    VehicleDataService.getAll()
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveVehicles();
  };

  const removeAllVehicles = () => {
    VehicleDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByOwnerId = () => {
    VehicleDataService.findByOwnerId(searchOwnerId)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openVehicles = (rowIndex) => {
    const id = vehiclesRef.current[rowIndex].id;

    props.history.push("/vehicles/" + id);
  };

  const deleteVehicles = (rowIndex) => {
    const id = vehiclesRef.current[rowIndex].id;

    VehicleDataService.remove(id)
      .then((response) => {
        props.history.push("/vehicles");

        let newTutorials = [...vehiclesRef.current];
        newTutorials.splice(rowIndex, 1);

        setVehicles(newTutorials);
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
        Header: "Vin",
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
        Header: "Owner_ID",
        accessor: "ownerId",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openVehicles(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteVehicles(rowIdx)}>
                <i className="fas fa-trash action"></i>
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
      </div>
    </div>
  );
};

export default VehicleList;
