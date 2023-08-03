import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/App.css";
import {
  Navbar,
  NavbarBrand,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { handleNewUser } from "./Methods/handleNewUser";
import { handleUpdateUser } from "./Methods/handleUpdateUser";
import { deleteTheUser } from "./Methods/deleteTheUser";

import FilterInput from "./Components/FilterInput";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import NavBarLinks from "./Components/NavBarLinks";
import TableEntries from "./Components/TableEntries";
import Pagination from "./Components/Pagination";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);

  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [toBeUpdated, setToBeUpdated] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
  });

  const [filterValue, setFilterValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setEditUser(!editUser);
  const toggle3 = () => setDropdownOpen((prevState) => !prevState);

  const [filterParameter, setFilterParameter] = useState({
    "No Filter": true,
    "Filter By Name": false,
    "Filter By Phone": false,
    "Filter By Address": false,
  });

  const editTheUser = (entry) => {
    toggle2();
    setToBeUpdated(entry);
  };

  // Function to fetch entries from db.json
  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/entries");
      // const data = await res.json();
      return res.data;
    } catch (error) {
      console.log("Error fetching entries:", error);
      return [];
    }
  };

  // Function to fetch and then set the fetched entries from server to the entries state
  const getEntries = async () => {
    setLoading(true);
    const entriesFromServer = await fetchEntries();
    setEntries(entriesFromServer);
    setLoading(false);
  };

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    console.log("Entries from useEffect", entries);
  }, [entries]);

  // Get current entries
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  // Change page
  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <SignIn />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                {/* {signUpForm && ( */}
                <SignUp
                // showSignUp={signUpForm}
                // onSignUp={() => setSignUpForm(!signUpForm)}
                />
                {/* )} */}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar color="secondary" dark expand="xl" container="fluid">
                  <NavbarBrand href="/">
                    <h1>
                      e-<span style={{ color: "yellow" }}>Yellow</span> Pages
                    </h1>
                  </NavbarBrand>
                  <NavBarLinks
                    onSignUp={() => setSignUpForm(!signUpForm)}
                    showSignUp={signUpForm}
                  ></NavBarLinks>
                </Navbar>

                <Container id="addUserSearch" className="d-flex">
                  <Button className="add-user" color="dark" onClick={toggle}>
                    Add User
                  </Button>
                  <div style={{ display: "flex", height: "3rem" }}>
                    <FilterInput
                      filterValue={filterValue}
                      setFilterValue={setFilterValue}
                      filterParameter={filterParameter}
                      entries={entries}
                      setEntries={setEntries}
                      getEntries={getEntries}
                    />
                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggle3}
                      direction="left"
                    >
                      {/* <DropdownMenu> */}
                      <DropdownToggle
                        caret
                        style={{ height: "3rem" }}
                      ></DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            // document.getElementById(
                            //   "search-yellow-pages"
                            // ).placeholder = "No Filter";
                            setFilterParameter({
                              "No Filter": true,
                              "Filter By Name": false,
                              "Filter By Phone": false,
                              "Filter By Address": false,
                            });
                          }}
                        >
                          No Filter
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            setFilterParameter({
                              "No Filter": false,
                              "Filter By Name": true,
                              "Filter By Phone": false,
                              "Filter By Address": false,
                            });
                          }}
                        >
                          Filter By Name
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            setFilterParameter({
                              "No Filter": false,
                              "Filter By Name": false,
                              "Filter By Phone": true,
                              "Filter By Address": false,
                            });
                          }}
                        >
                          Filter By Phone
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            setFilterParameter({
                              "No Filter": false,
                              "Filter By Name": false,
                              "Filter By Phone": false,
                              "Filter By Address": true,
                            });
                          }}
                        >
                          Filter By Address
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Container>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>
                    Fill in the details of the user :
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input
                          id="exampleName"
                          name="name"
                          placeholder="John Wick"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="examplePhone">Phone</Label>
                        <Input
                          id="examplePhone"
                          name="phone"
                          placeholder="0000000000"
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input
                          id="exampleAddress"
                          name="address"
                          placeholder="New York City, USA"
                          type="textarea"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      color="secondary"
                      onClick={() =>
                        handleNewUser(
                          name,
                          phone,
                          address,
                          entries,
                          setEntries,
                          setName,
                          setPhone,
                          setAddress,
                          setModal
                        )
                      }
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </Modal>
                <br />

                <TableEntries
                  currentEntries={currentEntries}
                  loading={loading}
                  editTheUser={editTheUser}
                  deleteTheUser={deleteTheUser}
                  fetchEntries={fetchEntries}
                  entries={entries}
                  setEntries={setEntries}
                />

                <Pagination
                  entriesPerPage={entriesPerPage}
                  totalEntries={entries.length}
                  paginate={paginate}
                />
                <Modal isOpen={editUser} toggle={toggle2}>
                  <ModalHeader toggle={toggle2}>
                    Edit the details of the user :
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input
                          id="exampleName"
                          name="name"
                          placeholder="John Wick"
                          type="text"
                          defaultValue={toBeUpdated.name}
                          onInput={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="examplePhone">Phone</Label>
                        <Input
                          id="examplePhone"
                          name="phone"
                          placeholder="0000000000"
                          type="number"
                          defaultValue={toBeUpdated.phone}
                          onInput={(e) => setPhone(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input
                          id="exampleAddress"
                          name="address"
                          placeholder="New York City, USA"
                          type="textarea"
                          defaultValue={toBeUpdated.address}
                          onInput={(e) => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      onClick={() =>
                        handleUpdateUser(
                          setEntries,
                          name,
                          phone,
                          address,
                          setName,
                          setPhone,
                          setAddress,
                          toBeUpdated,
                          setToBeUpdated,
                          setEditUser
                        )
                      }
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </Modal>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
