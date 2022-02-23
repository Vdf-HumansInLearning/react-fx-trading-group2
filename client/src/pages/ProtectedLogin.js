import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let cookie = Cookies.get("username");
  const user = { loggedIn: cookie ? true : false };
  return user && user.loggedIn;
};

const ProtectedLogin = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default ProtectedLogin;
