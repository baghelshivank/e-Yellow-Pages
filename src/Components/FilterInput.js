import React, { useEffect } from "react";
import "../Assets/App.css";

const FilterInput = ({
  filterValue,
  setFilterValue,
  filterParameter,
  entries,
  setEntries,
  getEntries,
}) => {
  useEffect(() => {
    // Check if the filterValue is an empty string and fetch all entries
    if (filterValue === "") {
      getEntries();
    }

    // Check if filterParameter is "No Filter" and fetch all entries
    if (filterParameter["No Filter"]) {
      getEntries();
    }

    // Check if the filterParameter is "Filter By Name" and filter entries by name
    if (filterValue !== "" && filterParameter["Filter By Name"]) {
      const filteredEntries = entries.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      setEntries(filteredEntries);
    }

    // Check if the filterParameter is "Filter By Phone" and filter entries by phone
    if (filterValue !== "" && filterParameter["Filter By Phone"]) {
      const filteredEntries = entries.filter((item) =>
        item.phone.includes(filterValue)
      );
      setEntries(filteredEntries);
    }

    // Check if the filterParameter is "Filter By Phone" and filter entries by phone
    if (filterValue !== "" && filterParameter["Filter By Address"]) {
      const filteredEntries = entries.filter((item) =>
        item.address.toLowerCase().includes(filterValue.toLowerCase())
      );
      setEntries(filteredEntries);
    }
  }, [filterValue, filterParameter]);

  return (
    <div>
      <input
        type="text"
        id="search-yellow-pages"
        name="search"
        value={filterValue}
        placeholder={`${Object.keys(filterParameter).find(
          (key) => filterParameter[key]
        )}`}
        autocomplete="off"
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
