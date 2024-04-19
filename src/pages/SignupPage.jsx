// import { useContext } from "react"
// import { SimpleContext } from "../App"
// import { AuthContext } from "../context/AuthContextWrapper"
import useAuthentication from "../context/UseAuthentication";
import { useState } from "react";
import tarotApi from "../service/myApi";
import { Link, useNavigate } from "react-router-dom";
function SignupPage() {
  // const contextValues = useContext(SimpleContext)
  // console.log(contextValues)
  const { user } = useAuthentication();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await tarotApi.post("authentication/signup", formState);
      console.log(response);
      if (response.status === 201) {
        nav("/login");
      }
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
      <h2>Signup form</h2>

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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
