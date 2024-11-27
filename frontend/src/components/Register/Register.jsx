import React from "react";

const SignupPage = () => {
  console.log("signup page");

  return (
    <div className="form-container">
      <div className="form-section">
        <h1>Sign Up</h1>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
