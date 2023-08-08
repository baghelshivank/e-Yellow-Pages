import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import handleSignIn from "../Methods/handleSignIn";
import "../Assets/App.css";

const SignIn = ({ setIsAdmin, setIsValidUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInToggle, setSignInToggle] = useState(true);

  const toggle = () => setSignInToggle(!signInToggle);

  return (
    <div>
      {!signInToggle && (
        <div id="back-btn-wrapper">
          <Link to="/">
            <i class="fa-solid fa-left-long back-btn"></i>
          </Link>
        </div>
      )}
      <Modal isOpen={signInToggle} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In :</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="signInMail">Email</Label>
              <Input
                id="signInMail"
                name="address"
                placeholder="abc@example.com"
                type="textarea"
                onChange={(e) => setSignInEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="signInPw">Password</Label>
              <Input
                id="signInPw"
                name="address"
                placeholder="********"
                type="password"
                onChange={(e) => setSignInPassword(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Link to="/">
            <Button
              type="submit"
              color="secondary"
              onClick={() => {
                handleSignIn(
                  signInEmail,
                  signInPassword,
                  setIsAdmin,
                  setIsValidUser
                );
                setSignInEmail("");
                setSignInPassword("");
              }}
            >
              Sign In
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignIn;
