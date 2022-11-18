import React, { useState, useEffect, useMemo, useRef } from "react";
import OwnerDataService from "../../services/OwnersService";
import { useTable } from "react-table";

const OwnerList = (props) => {
  const [owners, setOwners] = useState([]);
  const [searchLicense, setSearchLicense] = useState("");
  const ownersRef = useRef();

  ownersRef.current = owners;

  useEffect(() => {
    retrieveOwners();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchLicense(searchTitle);
  };

  const retrieveOwners = () => {
    OwnerDataService.getAll()
      .then((response) => {
        setOwners(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveOwners();
  };

  const removeAllOwners = () => {
    OwnerDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByLicense = () => {
    OwnerDataService.findByLicense(searchLicense)
      .then((response) => {
        setOwners(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openOwners = (rowIndex) => {
    const id = ownersRef.current[rowIndex].id;

    props.history.push("/owners/" + id);
  };

  const deleteOwners = (rowIndex) => {
    const id = ownersRef.current[rowIndex].id;

    OwnerDataService.remove(id)
      .then((response) => {
        props.history.push("/owners");

        let newTutorials = [...ownersRef.current];
        newTutorials.splice(rowIndex, 1);

        setOwners(newTutorials);
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
        Header: "License",
        accessor: "license",
      },
      {
        Header: "First name",
        accessor: "firstName",
      },
      {
        Header: "Last name",
        accessor: "lastName",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openOwners(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteOwners(rowIdx)}>
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
      data: owners,
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

export default OwnerList;
