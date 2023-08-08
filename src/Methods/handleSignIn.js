import axios from "axios";
import bcrypt from "bcryptjs";

const handleSignIn = async (email, password, setIsAdmin, setIsValidUser) => {
  console.log("Sign In Email :", email);
  console.log("Sign In Password :", password);
  try {
    const res = await axios.get(`http://localhost:5000/entries?email=${email}`);
    if (res.data[0] === undefined) {
      return window.alert("This email isn't registered with us.");
    } else if (await bcrypt.compare(password, res.data[0].password)) {
      setIsValidUser(true);
      const admin = res.data[0].admin;
      if (admin === true) {
        setIsAdmin(true);
      }
    } else {
      return window.alert("Wrong password for the given email");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    window.alert("An error occurred during sign in.");
  }
};

export default handleSignIn;
