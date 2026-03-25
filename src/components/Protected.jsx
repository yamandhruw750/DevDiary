import React, { useState, useEffect, Children } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication) {
      // Protected route (need login)
      if (!authStatus) {
        navigate("/login");
      }
    } else {
      // Public route (login/signup pages)
      if (authStatus) {
        navigate("/");
      }
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : children;
}
