import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "./../context/UseAuthentication";
import tarotApi from "../service/myApi";

function LoginPage() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { storeToken, authenticateUser } = useAuth();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form state:", formState);
    try {
      const response = await tarotApi.post("/authentication/login", formState);
      console.log(response);
      const token = response.data.authToken;
      storeToken(token);
      await authenticateUser();
    } catch (error) {
      console.log(error.message);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  const { password, email } = formState;
  return (
    <div>
      <h2>Login form</h2>

      <p style={{ color: "red" }}>{error}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
        <p>
          Need an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
