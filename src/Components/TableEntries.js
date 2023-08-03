import React from "react";
import { Table } from "reactstrap";

const TableEntries = ({
  currentEntries,
  loading,
  editTheUser,
  deleteTheUser,
  fetchEntries,
  entries,
  setEntries,
}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Table hover className="entries-wrapper">
        <tbody className="table-secondary">
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>
          {currentEntries.map((entry, index) => (
            <tr key={entry.id} className="entry">
              <td>
                {entries.findIndex((entryy) => entryy.id === entry.id) + 1}
              </td>
              {/* <td>{index + 1}</td> */}
              <td>{entry.name}</td>
              <td>{entry.phone}</td>
              <td>{entry.address}</td>
              <td colSpan="3">
                <div className="icon-wrappers">
                  <div
                    className="icon1"
                    onClick={() => editTheUser(entry)}
                  ></div>
                  <div
                    className="icon2"
                    onClick={() =>
                      deleteTheUser(entry.id, fetchEntries, setEntries)
                    }
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableEntries;
