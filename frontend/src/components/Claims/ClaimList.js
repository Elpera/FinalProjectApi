import React, { useState, useEffect, useMemo, useRef } from "react";
import ClaimDataService from "../../services/ClaimsService";
import { useTable } from "react-table";

const ClaimList = (props) => {
  const [claims, setClaims] = useState([]);
  const [searchLicense, setSearchLicense] = useState("");
  const claimsRef = useRef();

  claimsRef.current = claims;

  useEffect(() => {
    retrieveClaims();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchLicense(searchTitle);
  };

  const retrieveClaims = () => {
    ClaimDataService.getAll()
      .then((response) => {
        setClaims(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveClaims();
  };

  const removeAllOwners = () => {
    ClaimDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByLicense = () => {
    ClaimDataService.findByLicense(searchLicense)
      .then((response) => {
        setClaims(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openClaims = (rowIndex) => {
    const id = claimsRef.current[rowIndex].id;

    props.history.push("/claims/" + id);
  };

  const deleteClaims = (rowIndex) => {
    const id = claimsRef.current[rowIndex].id;

    ClaimDataService.remove(id)
      .then((response) => {
        props.history.push("/claims");

        let newClaims_ = [...claimsRef.current];
        newClaims_.splice(rowIndex, 1);

        setClaims(newClaims_);
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
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Vehicle Id",
        accessor: "vehicle_Id",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openClaims(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteClaims(rowIdx)}>
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
      data: claims,
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

export default ClaimList;
