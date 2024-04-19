import { useContext } from "react";
import { AuthContext } from "./AuthenticationContextWrapper";
const useAuth = () => useContext(AuthContext);

export default useAuth;
