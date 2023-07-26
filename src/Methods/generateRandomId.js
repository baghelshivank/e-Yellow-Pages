export function generateRandomId(entries) {
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
