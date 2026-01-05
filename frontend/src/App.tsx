import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Index from "./(protected)/Home";
import Auth from "./(public)/auth";
import PrivacyPolicy from "./(public)/privacy-policy";
import CHATMEE_GULL_LOGO from "./assets/chatmee-full-logo.png";
import { useAuthState } from "./store/auth-store";

function App() {
  const { user, loading, checkAuth } = useAuthState();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading)
    return (
      <div className="bg-dark-100 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex justify-center">
            <img src={CHATMEE_GULL_LOGO} alt="full icon" className="h-10" />
          </div>
          <div>
            <p className="text-white font-bold text-4xl">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={!user ? <Auth /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <Auth /> : <Navigate to="/" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* =================== Protected Route =================== */}
        <Route path="/" element={user ? <Index /> : <Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
