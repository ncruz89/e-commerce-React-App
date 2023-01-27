import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer, SignUpButton } from "./sign-up-form.styles.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// SignUpForm component
// handles form field state
// renders signup form which contains 4 input fields and a signup button
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  // helper function to reset form fields state to default state
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // submit handler

  const handleSubmit = async (event) => {
    event.preventDefault();

    //confirm passwords match
    if (password !== confirmPassword) return alert("passwords do not match");

    try {
      // see if we auth user with email and password with imported function
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // create user document in firebase db with what was returned from createAuthUserWithEm... function
      // dont forget to pass displayName when you're generating document from createAuthUser... return
      await createUserDocumentFromAuth(user, {
        displayName,
      });

      // set currentUser state
      dispatch(setCurrentUser(user));

      // call to reset form fields
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else console.log("error creating user", err.message);
    }
  };

  // input change handler
  // sets form field state when input fields change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <SignUpButton type="submit">Sign Up</SignUpButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
