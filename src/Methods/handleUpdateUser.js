import axios from "axios";
export async function handleUpdateUser(
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
) {
  const handleUpdateEntry = (updateUser) => {
    // const index = entries.findIndex((entry) => entry.id === updateUser.id);
    // entries.splice(index, 1, updateUser);
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.map((entry) =>
        entry.id === updateUser.id ? updateUser : entry
      );
      return updatedEntries;
    });
  };

  const updateUser = {
    id: toBeUpdated.id,
    name: name === "" ? toBeUpdated.name : name,
    phone: phone === "" ? toBeUpdated.phone : phone,
    address: address === "" ? toBeUpdated.address : address,
  };
  // await fetch(`http://localhost:5000/entries/${updateUser.id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify(updateUser),
  // });
  await axios.put(`http://localhost:5000/entries/${updateUser.id}`, updateUser);

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
}
