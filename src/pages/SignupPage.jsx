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
      <h1 className=" text-3xl font-bold text-purple-800 text-center my-16">
        Rider-A-Waite
      </h1>

      <p className=" text-red-400">{error}</p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 items-center justify-center  text-left">
          <div>
            <label className="text-purple-800 font-bold mr-9" htmlFor="email">
              email{" "}
            </label>
            <input
              className="border border-purple-600 rounded-lg p-2 w-44"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="text-purple-800 font-bold mr-2"
              htmlFor="password"
            >
              password{" "}
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
              className="border border-purple-600 rounded-lg p-2 w-44"
            />
          </div>
          <button className="bg-purple-200 rounded-lg p-2 text-purple-800 font-bold hover:border hover:border-purple-800 mt-5 mb-10">
            sign up
          </button>
          <p className="text-purple-800 text-center">
            Already have an account? <br />
            <Link to="/login" className="font-bold hover:text-purple-200">
              Login here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
