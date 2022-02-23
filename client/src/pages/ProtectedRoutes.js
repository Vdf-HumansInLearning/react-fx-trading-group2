import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let cookie = Cookies.get("username");
  const user = { loggedIn: cookie ? true : false };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;