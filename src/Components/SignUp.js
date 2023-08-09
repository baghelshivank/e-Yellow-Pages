import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import bcrypt from "bcryptjs";
import { handleNewUser } from "../Methods/handleNewUser";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Assets/App.css";

const SignUp = ({ formData, setFormData, entries, setEntries }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValid, setFormValid] = useState({
    nameValid: false,
    genderValid: false,
    departmentValid: false,
    projectsValid: false,
    emailValid: false,
    phoneValid: false,
    addressValid: false,
    passwordValid: false,
  });

  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const isValidName = (name) => {
    // const namePattern = /^[\\p{L}\\p{M} .'-]+$/;
    const namePattern = /^[a-zA-Z ]{2,30}$/;
    return namePattern.test(name);
  };
  const isValidEmail = (email) => {
    // Email validation using a regular expression/regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  const isValidPhone = (phone) => {
    // const phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const phonePattern =
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm;
    return phonePattern.test(phone);
  };
  const isValidAddress = (address) => {
    const addressPattern = /^[a-zA-Z0-9\s,'-]*$/;
    return addressPattern.test(address);
  };
  const isValidPassword = (password) => {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return passwordPattern.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "name") {
      setFormValid((prevState) => ({
        ...prevState,
        nameValid: isValidName(e.target.value),
      }));
    }
    if (e.target.name === "gender") {
      if (formData.gender !== "") {
        setFormValid((prevState) => ({
          ...prevState,
          genderValid: true,
        }));
      }
    }
    if (e.target.name === "department") {
      if (formData.department !== "") {
        setFormValid((prevState) => ({
          ...prevState,
          departmentValid: true,
        }));
      }
    }
    if (e.target.name === "email") {
      setFormValid((prevState) => ({
        ...prevState,
        emailValid: isValidEmail(e.target.value),
      }));
    }
    if (e.target.name === "phone") {
      setFormValid((prevState) => ({
        ...prevState,
        phoneValid: isValidPhone(e.target.value),
      }));
    }
    if (e.target.name === "address") {
      setFormValid((prevState) => ({
        ...prevState,
        addressValid: isValidAddress(e.target.value),
      }));
    }
    if (e.target.name === "password") {
      setFormValid((prevState) => ({
        ...prevState,
        passwordValid: isValidPassword(e.target.value),
      }));
    }
  };

  const handleProjectChange = (e) => {
    const { value, checked } = e.target;
    const updatedProjects = checked
      ? [...formData.projects, value]
      : formData.projects.filter((project) => project !== value);
    setFormData({ ...formData, projects: updatedProjects });
    if (e.target.name === "projects") {
      if (formData.projects.length > 0) {
        setFormValid((prevState) => ({
          ...prevState,
          projectsValid: true,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside handleSubmit");
    setIsSubmit(true);

    if (Object.values(formValid).every((value) => value === true)) {
      console.log("Hello");
      // Hash the password on the client-side before sending it to the server
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);
      // console.log("Hashed Password:", hashedPassword);
      formData.password = hashedPassword;
      await handleNewUser(formData, entries, setEntries);

      setFormData({
        id: "",
        name: "",
        gender: "",
        department: "",
        projects: [],
        email: "",
        phone: "",
        address: "",
        password: "",
        admin: false,
      });
      setFormValid({
        nameValid: false,
        genderValid: false,
        departmentValid: false,
        projectsValid: false,
        emailValid: false,
        phoneValid: false,
        addressValid: false,
        passwordValid: false,
      });
      setIsSubmit(false);
      // window.location.replace("http://www.w3schools.com");
      // window.location.replace("http://localhost:3000/");

      // Start the countdown
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Redirect after 10 seconds
      setTimeout(() => {
        clearInterval(timer); // Clear the countdown interval
        navigate("/"); // Replace "/new-route" with your desired route
      }, 5000); // 10000 milliseconds = 10 seconds
    }
  };

  // useEffect(() => {
  //   if (Object.values(formValid).every((value) => value === true)) {
  //     console.log("Hello");
  //   }
  // }, [formValid]);

  return (
    <div id="sign-up-form-wrapper">
      <div id="back-btn-wrapper">
        <Link to="/">
          <i className="fa-solid fa-left-long back-btn"></i>
        </Link>
      </div>
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
      <Form
        id="sign-up-form"
        onSubmit={handleSubmit}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   console.log("Submit Button Clicked");
        //   handleSubmit();
        // }}
      >
        <FormGroup>
          <Label for="suName">Name</Label>
          <Input
            id="suName"
            name="name"
            placeholder="Enter your name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            valid={formValid.nameValid}
          />
          {isSubmit && !formValid.nameValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />
        <FormGroup>
          <Label>Gender</Label>

          <FormGroup check>
            <Label check>
              <Input
                name="gender"
                type="radio"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                valid={formValid.genderValid}
              />{" "}
              Male
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                name="gender"
                type="radio"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                valid={formValid.genderValid}
              />{" "}
              Female
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                name="gender"
                type="radio"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                valid={formValid.genderValid}
              />{" "}
              Other
            </Label>
          </FormGroup>
          {isSubmit && !formValid.genderValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />

        <FormGroup>
          <Label for="suDepartment">Department</Label>
          <Input
            id="suDepartment"
            name="department"
            type="select"
            value={formData.department}
            onChange={handleChange}
            valid={formValid.departmentValid}
          >
            <option value="Front End">Front End</option>
            <option value="Back End">Back End</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Dev Ops">Dev Ops</option>
            <option value="Testing">Testing</option>
          </Input>
          {isSubmit && !formValid.departmentValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />

        <FormGroup>
          <Label>Projects</Label>
          <FormGroup check>
            <Input
              name="projects"
              type="checkbox"
              value="Banking Application"
              checked={formData.projects.includes("Banking Application")}
              onChange={handleProjectChange}
              valid={formValid.projectsValid}
            />
            <Label check>Banking Application</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name="projects"
              type="checkbox"
              value="Library Management App"
              checked={formData.projects.includes("Library Management App")}
              onChange={handleProjectChange}
              valid={formValid.projectsValid}
            />
            <Label check>Library Management App</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name="projects"
              type="checkbox"
              value="EdTech App"
              checked={formData.projects.includes("EdTech App")}
              onChange={handleProjectChange}
              valid={formValid.projectsValid}
            />
            <Label check>EdTech App</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name="projects"
              type="checkbox"
              value="FinTech App"
              checked={formData.projects.includes("FinTech App")}
              onChange={handleProjectChange}
              valid={formValid.projectsValid}
            />
            <Label check>FinTech App</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name="projects"
              type="checkbox"
              value="E-Commerce App"
              checked={formData.projects.includes("E-Commerce App")}
              onChange={handleProjectChange}
              valid={formValid.projectsValid}
            />
            <Label check>E-Commerce App</Label>
          </FormGroup>
          {isSubmit && !formValid.projectsValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />

        <FormGroup>
          <Label for="suEmail">Email</Label>
          <Input
            id="suEmail"
            name="email"
            placeholder="abc@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            valid={formValid.emailValid}
          />
          {isSubmit && !formValid.emailValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
          {/* <FormFeedback tooltip valid={formValid.emailValid}>
            {formValid.emailValid
              ? "Valid email address"
              : "Invalid email address"}
          </FormFeedback> */}
        </FormGroup>
        <br />

        <FormGroup>
          <Label for="suPhone">Phone</Label>
          <Input
            id="suPhone"
            name="phone"
            placeholder="Enter your phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            valid={formValid.phoneValid}
          />
          {isSubmit && !formValid.phoneValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />

        <FormGroup>
          <Label for="suAddress">Address</Label>
          <Input
            id="suAddress"
            name="address"
            placeholder="Enter your address"
            type="textarea"
            value={formData.address}
            onChange={handleChange}
            valid={formValid.addressValid}
          />
          {isSubmit && !formValid.addressValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />

        <FormGroup>
          <Label for="suPassword">Password</Label>
          <Input
            id="suPassword"
            name="password"
            placeholder="********"
            type="password"
            value={formData.password}
            onChange={handleChange}
            valid={formValid.passwordValid}
          />
          {isSubmit && !formValid.passwordValid && (
            <p style={{ color: "red" }}>*Invalid Input*</p>
          )}
        </FormGroup>
        <br />
        <div id="sign-up-btn-wrapper">
          <button
            id="sign-up-btn"
            type="submit"
            // onSubmit={(e) => handleSubmit(e)}
            // onSubmit={() => handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
