import React, { useState, useRef } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./SignUpScreen.css";

function SignUpScreen({ formUp }) {
  const [signUpForm, setSignUpForm] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      alert("Successfull registration.");
      console.log(user);
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      alert("Successfull login.");
      console.log(user);
    } catch (error) {
      alert(error.message);
    }
  };

  const signInJSX = (
    <h4>
      <span className="signupScreen__gray"> Already have account?</span>
      <span className="signupScreen__link" onClick={() => setSignUpForm(false)}>
        {" "}
        Log In.
      </span>
    </h4>
  );

  const signUpJSX = (
    <h4>
      <span className="signupScreen__gray"> New to Netflix?</span>
      <span className="signupScreen__link" onClick={() => setSignUpForm(true)}>
        {" "}
        Sign Up now.
      </span>
    </h4>
  );

  return (
    <div className="signupScreen">
      <form>
        <h1>{signUpForm ? "Sign Up" : "Sign In"}</h1>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={signUpForm ? register : signIn}>
          {signUpForm ? "Register" : "Login"}
        </button>
        {!signUpForm ? signUpJSX : signInJSX}
      </form>
    </div>
  );
}

export default SignUpScreen;
