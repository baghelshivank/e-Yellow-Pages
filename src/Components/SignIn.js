import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

const SignIn = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInToggle, setSignInToggle] = useState(true);

  const toggle = () => setSignInToggle(!signInToggle);

  return (
    <div>
      <Modal isOpen={toggle} toggle={toggle}>
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
                type="textarea"
                onChange={(e) => setSignInPassword(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="secondary"
            onClick={() => {
              handleSignIn(signInEmail, signInPassword);
              setSignInEmail("");
              setSignInPassword("");
            }}
          >
            Sign In
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignIn;
