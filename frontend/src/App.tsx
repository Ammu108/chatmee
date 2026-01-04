import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Index from "./(protected)/Home";
import Auth from "./(public)/auth";
import PrivacyPolicy from "./(public)/privacy-policy";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
