import axios from "axios";
import { generateRandomId } from "./generateRandomId";
export async function handleNewUser(
  name,
  phone,
  address,
  entries,
  setEntries,
  setName,
  setPhone,
  setAddress,
  setModal
) {
  try {
    const newUser = {
      id: generateRandomId(entries),
      name: name,
      phone: phone,
      address: address,
    };
    // const res = await fetch("http://localhost:5000/entries", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(newUser),
    // });
    // const data = await res.json();
    // setEntries([...entries, data]);

    const res = await axios.post("http://localhost:5000/entries", newUser);
    setEntries([...entries, res.data]);

    setName("");
    setPhone("");
    setAddress("");
    setModal(false);
  } catch (error) {
    console.error("Error in updating the existingEntries : ", error);
  }
}
