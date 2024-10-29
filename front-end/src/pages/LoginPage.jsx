import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/storage";

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || getToken()) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return <LoginForm />;
}

export default LoginPage;
