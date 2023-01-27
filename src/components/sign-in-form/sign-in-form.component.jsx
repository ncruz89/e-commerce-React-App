import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { SignInContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

// SignInForm component
// handles form field state

// renders Sign in form which contains two input fields and two Button components

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // helper function that resets form fields back to default state
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // helper function that calls function in firebase.utils which calls firebase's google sign in method
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (err) {
      console.log(err);
    }
  };

  // submit handler - calls method in firebase.utils which calls firebase's signInWithEmailAndPassword method
  // resets form fields if successful
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        default:
          console.log(err);
      }
    }
  };

  // change handler for input fields
  // sets form fields with updated values
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
