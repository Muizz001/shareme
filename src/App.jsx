import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fetchUser } from "./utils/fetchUser";
import { useEffect } from "react";

function App() {
  const user = fetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
