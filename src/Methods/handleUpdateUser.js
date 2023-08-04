import axios from "axios";
export async function handleUpdateUser(
  setEntries,
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
    name: toBeUpdated.name,
    gender: toBeUpdated.gender,
    department: toBeUpdated.department,
    projects: toBeUpdated.projects,
    email: toBeUpdated.email,
    phone: toBeUpdated.phone,
    address: toBeUpdated.address,
    password: toBeUpdated.password,
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
  setToBeUpdated({
    id: "",
    name: "",
    gender: "",
    department: "",
    projects: [],
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  setEditUser(false);
}
