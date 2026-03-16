import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Button } from "../ui/button";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return <Button onClick={logoutHandler} variant="destructive">Logout</Button>;
}

export default LogoutBtn;
