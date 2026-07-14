import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col">
      {location.pathname !== "/" && <Header />}
      <main className="grow w-full min-h-[60vh] flex items-center justify-center text-center">
        <div key={location.pathname} className="route-transition w-full">
          <Outlet />
        </div>
      </main>
      {location.pathname !== "/" && <Footer />}
    </div>
  ) : null;
}

export default App;
