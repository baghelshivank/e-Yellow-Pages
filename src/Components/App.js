import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/App.css";
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

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "Shivank1",
      phone: 7987388402,
      address: "Indore, MP",
    },
    {
      id: 2,
      name: "Raghav1",
      phone: 8888888888,
      address: "Indore, MP",
    },
    {
      id: 3,
      name: "Shivank2",
      phone: 7987388402,
      address: "Indore, MP",
    },
    {
      id: 4,
      name: "Raghav2",
      phone: 8888888888,
      address: "Indore, MP",
    },
    {
      id: 5,
      name: "Shivank3",
      phone: 7987388402,
      address: "Indore, MP",
    },
    {
      id: 6,
      name: "Raghav3",
      phone: 8888888888,
      address: "Indore, MP",
    },
    {
      id: 7,
      name: "Shivank4",
      phone: 7987388402,
      address: "Indore, MP",
    },
    {
      id: 8,
      name: "Raghav4",
      phone: 8888888888,
      address: "Indore, MP",
    },
    {
      id: 9,
      name: "Shivank5",
      phone: 7987388402,
      address: "Indore, MP",
    },
    {
      id: 10,
      name: "Raghav5",
      phone: 8888888888,
      address: "Indore, MP",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [toBeUpdated, setToBeUpdated] = useState({
    id: 0,
    name: "",
    phone: 0,
    address: "",
  });

  const toggle = () => setModal(!modal);
  const toggle2 = () => setEditUser(!editUser);

  const handleNewEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  const handleNewUser = () => {
    const newUser = {
      id: entries.length + 1,
      name: name,
      phone: phone,
      address: address,
    };
    handleNewEntry(newUser);
    setName("");
    setPhone("");
    setAddress("");
    setModal(false);
  };

  const handleUpdatedEntry = (update) => {
    console.log(entries);
    const index = update.id - 1;
    entries.splice(index, 1, update);
    console.log(entries);
  };
  const handleUpdatedUser = () => {
    const updatedUser = {
      id: toBeUpdated.id,
      name: name === "" ? toBeUpdated.name : name,
      phone: phone === "" ? toBeUpdated.phone : phone,
      address: address === "" ? toBeUpdated.address : address,
    };

    handleUpdatedEntry(updatedUser);
    setName("");
    setPhone("");
    setAddress("");
    setToBeUpdated({
      id: "",
      name: "",
      phone: "",
      address: "",
    });
    setEditUser(false);
  };
  const editTheUser = (entry) => {
    console.log(entries);
    toggle2();
    setToBeUpdated(entry);
  };

  function updateIds(arr) {
    arr.forEach((obj, index) => {
      obj.id = index + 1;
    });
  }

  const deleteTheUser = (index) => {
    return new Promise((resolve) => {
      const updatedEntries = [...entries];
      updatedEntries.splice(index, 1);
      updateIds(updatedEntries);
      resolve(updatedEntries);
    })
      .then((updatedEntries) => {
        setEntries(updatedEntries);
      })
      .then(() => {
        console.log(entries);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

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
          <Button color="secondary" onClick={handleNewUser}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <br />
      <Table hover className="entries-wrapper">
        <tbody className="table-secondary">
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>

          {entries.map((entry, index) => (
            <tr key={index} className="entry">
              <td>{entry.id}</td>
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
                    onClick={() => deleteTheUser(index)}
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
          <Button color="secondary" onClick={handleUpdatedUser}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
