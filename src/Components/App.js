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

  function generateRandomId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 8;

    while (true) {
      let randomId = "";
      for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
      }

      // Check if the generated ID already exists in the list of existing IDs
      if (!entries.some((entry) => entry.id === randomId)) {
        return randomId; // Return the unique ID
      }
    }
  }

  const handleNewUser = async () => {
    try {
      const newUser = {
        id: generateRandomId(),
        name: name,
        phone: phone,
        address: address,
      };
      const res = await fetch("http://localhost:5000/entries", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      setEntries([...entries, data]);

      setName("");
      setPhone("");
      setAddress("");
      setModal(false);
    } catch (error) {
      console.error("Error in updating the existingEntries : ", error);
    }
  };

  const handleUpdateEntry = (updateUser) => {
    const index = entries.findIndex((entry) => entry.id === updateUser.id);
    entries.splice(index, 1, updateUser);
  };
  const handleUpdateUser = async () => {
    const updateUser = {
      id: toBeUpdated.id,
      name: name === "" ? toBeUpdated.name : name,
      phone: phone === "" ? toBeUpdated.phone : phone,
      address: address === "" ? toBeUpdated.address : address,
    };
    await fetch(`http://localhost:5000/entries/${updateUser.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    handleUpdateEntry(updateUser);
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
    toggle2();
    setToBeUpdated(entry);
  };

  // const deleteTheUser = async (id) => {
  //   try {
  //     await fetch(`http://localhost:5000/entries/${id}`, {
  //       method: "DELETE",
  //     });
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  //   const updatedEntries = entries.filter(
  //     (entry, index) => entry.id !== index + 1
  //   );
  //   setEntries(updatedEntries);
  // }
  // NOTE : The issue with the deletion not working properly seems to be related to how the deleteTheUser function is handling the deletion process. The problem arises due to the asynchronous behavior of the setState function, which means that the entries state might not be updated instantly when you try to delete an entry.
  // Sometimes the code could lead to inconsistent data if the server-side deletion fails or takes longer to respond.
  // RACE CONDITION : When you perform the fetch to delete the entry, the setEntries function will be called immediately after the fetch, before the server responds. If the server takes some time to delete the entry or if the deletion fails, the frontend would have already removed the entry from the UI, but it might still exist in the backend. This leads to inconsistency between frontend and backend data.
  const deleteTheUser = (id) => {
    fetch(`http://localhost:5000/entries/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // After the delete request is successful, fetch the updated entries
        return fetchEntries();
      })
      .then((updatedEntries) => {
        // Update the state with the fetched updated entries
        setEntries(updatedEntries);
      })

      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  // Function to fetch entries from db.json
  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/entries");
      const data = await res.json();
      return data;
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
          <Button type="submit" color="secondary" onClick={handleNewUser}>
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
                      onClick={() => deleteTheUser(entry.id)}
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
          <Button color="secondary" onClick={handleUpdateUser}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
