import axios from "axios";

const handleSignIn = async (email, password) => {
  const res = await axios.get(`http://localhost:5000/entries/${email}`);

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default handleSignIn;
