import React from "react";

const LoginPage = () => {
  console.log("login page");

  return (
    <div className="login-container">
      {/* Login Form */}
      <div className="form-section">
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
