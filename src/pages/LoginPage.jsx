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
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="border border-purple-600 rounded-lg p-2 w-44"
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
            login
          </button>
          <p className="text-purple-800 text-center">
            Don't have an account yet? <br />
            <Link to="/signup" className="font-bold hover:text-purple-200">
              Signup here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
