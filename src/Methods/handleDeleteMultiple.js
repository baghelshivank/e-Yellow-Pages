import axios from "axios";
export async function handleDeleteMultiple(
  selectedEntries,
  setSelectedEntries,
  fetchEntries,
  setEntries
) {
  //   console.log("Deleting selected entries:", selectedEntries);
  try {
    // Map selectedEntries to an array of delete promises
    const deletePromises = selectedEntries.map((id) => {
      return axios.delete(`http://localhost:5000/entries/${id}`);
    });
    await Promise.all(deletePromises);
    const updatedEntries = await fetchEntries();

    setEntries(updatedEntries);
  } catch (error) {
    console.error("Error occurred:", error);
  }
  setSelectedEntries([]);
}
