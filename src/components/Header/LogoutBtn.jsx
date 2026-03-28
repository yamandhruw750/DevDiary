import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <Button onClick={logoutHandler} variant="destructive">
      Logout
    </Button>
  );
}

export default LogoutBtn;
