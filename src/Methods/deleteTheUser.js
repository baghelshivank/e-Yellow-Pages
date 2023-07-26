export function deleteTheUser(id, fetchEntries, setEntries) {
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
}
