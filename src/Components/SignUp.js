import "bootstrap/dist/css/bootstrap.min.css";
import bcrypt from "bcryptjs";
import { handleNewUser } from "../Methods/handleNewUser";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import handleSignUp from "../Methods/handleSignUp";
import { Link } from "react-router-dom";

const SignUp = ({ formData, setFormData, entries, setEntries }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (e) => {
    const { value, checked } = e.target;
    const updatedProjects = checked
      ? [...formData.projects, value]
      : formData.projects.filter((project) => project !== value);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    // Hash the password on the client-side before sending it to the server
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

    // Now, you can send the hashed password to the server for sign-up or registration
    // For demonstration purposes, we will just log the hashed password
    console.log("Hashed Password:", hashedPassword);
    formData.password = hashedPassword;
    await handleNewUser(formData, entries, setEntries);

    // Reset the form fields after submission (you can send the form data to the server here)
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
    });
    // window.location.replace("http://www.w3schools.com");
    window.location.replace("http://localhost:3000/");
  };

  return (
    <div>
      <Link to="/">
        <Button type="button" color="secondary">
          &lt;---
        </Button>
      </Link>

      <Form>
        <FormGroup>
          <Label for="suName">Name</Label>
          <Input
            id="suName"
            name="name"
            placeholder="Enter your name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>

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
              />{" "}
              Other
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label for="suDepartment">Department</Label>
          <Input
            id="suDepartment"
            name="department"
            type="select"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Front End">Front End</option>
            <option value="Back End">Back End</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Dev Ops">Dev Ops</option>
            <option value="Testing">Testing</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Projects</Label>
          <FormGroup check>
            <Input
              name="projects"
              type="checkbox"
              value="Banking Application"
              checked={formData.projects.includes("Banking Application")}
              onChange={handleProjectChange}
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
            />
            <Label check>E-Commerce App</Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label for="suEmail">Email</Label>
          <Input
            id="suEmail"
            name="email"
            placeholder="abc@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="suPhone">Phone</Label>
          <Input
            id="suPhone"
            name="phone"
            placeholder="Enter your phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="suAddress">Address</Label>
          <Input
            id="suAddress"
            name="address"
            placeholder="Enter your address"
            type="textarea"
            value={formData.address}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="suPassword">Password</Label>
          <Input
            id="suPassword"
            name="password"
            placeholder="********"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
      </Form>
      <Button type="submit" color="secondary" onClick={() => handleSubmit()}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
