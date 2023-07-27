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
} from "reactstrap";

import { handleNewUser } from "./Methods/handleNewUser";
import { handleUpdateUser } from "./Methods/handleUpdateUser";
import { deleteTheUser } from "./Methods/deleteTheUser";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [entries, setEntries] = useState([]);

  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [toBeUpdated, setToBeUpdated] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
  });

  const toggle = () => setModal(!modal);
  const toggle2 = () => setEditUser(!editUser);

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

  useEffect(() => {
    const getEntries = async () => {
      const entriesFromServer = await fetchEntries();
      setEntries(entriesFromServer);
    };
    getEntries();
  }, []);

  useEffect(() => {
    console.log("Entries from useEffect", entries);
  }, [entries]);

  return (
    <div className="App">
      <Navbar color="secondary" dark expand="xl" container="fluid">
        <NavbarBrand href="/">
          <h1>
            e-<span style={{ color: "yellow" }}>Yellow</span> Pages
          </h1>
        </NavbarBrand>
      </Navbar>

      <Container className="d-flex justify-content-center">
        <Button className="add-user" color="dark" onClick={toggle}>
          Add User
        </Button>
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
      <Table hover className="entries-wrapper">
        <tbody className="table-secondary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>

          {entries &&
            entries.map((entry, index) => (
              <tr key={entry.id} className="entry">
                <td>{index + 1}</td>
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
    </div>
  );
}

export default App;
