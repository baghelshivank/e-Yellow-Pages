import React, { useState } from "react";
import { Table, Tooltip } from "reactstrap";

const TableEntries = ({
  currentEntries,
  loading,
  editTheUser,
  deleteTheUser,
  fetchEntries,
  entries,
  setEntries,
  isAdmin,
  isValidUser,
  handleDeleteMultiple,
  selectedEntries,
  setSelectedEntries,
  handleCheckboxChange,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle4 = () => setTooltipOpen(!tooltipOpen);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    isValidUser && (
      <div>
        <Table hover className="entries-wrapper">
          <tbody className="table-secondary">
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th></th>
              <th>
                Edit/Delete/
                <br />
                <a
                  id="delete-multiple"
                  onClick={() => {
                    console.log("Delete Multiple");
                    handleDeleteMultiple(
                      selectedEntries,
                      setSelectedEntries,
                      fetchEntries,
                      setEntries
                    );
                  }}
                >
                  <div>
                    Delete Multiple <i class="fa-solid fa-trash"></i>
                  </div>
                </a>
              </th>
            </tr>
            {currentEntries.map((entry, index) => {
              return (
                <tr key={entry.id} className="entry">
                  <td>
                    {entries.findIndex((entryy) => entryy.id === entry.id) + 1}
                  </td>
                  {/* <td>{index + 1}</td> */}
                  <td>{entry.name}</td>
                  <td>{entry.gender}</td>
                  <td>{entry.department}</td>
                  <td>
                    <i href="#" id="more-info">
                      ...more
                    </i>
                  </td>
                  <Tooltip
                    placement="top"
                    isOpen={tooltipOpen}
                    autohide={false}
                    target="more-info"
                    toggle={toggle4}
                    trigger="click"
                  >
                    Email : {entry.email} Phone : {entry.phone}{" "}
                    {/* { let i = entry.email, j = entry.phone }
                Email : {i} Phone : {j}{" "} */}
                  </Tooltip>
                  <td colSpan="3">
                    {isAdmin && (
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
                        <input
                          type="checkbox"
                          checked={selectedEntries.includes(entry.id)}
                          onChange={() => handleCheckboxChange(entry.id)}
                        ></input>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    )
  );
};

export default TableEntries;
