import React, { useState, useRef } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./SignUpScreen.css";

function SignUpScreen({ formUp }) {
  const [signUpForm, setSignUpForm] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const register = async (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        alert("Successfull registration");
        navigate("/profile");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = async (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        alert("Successfull login");
        navigate("/");
      })
      .catch((error) => alert(error.message));
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
