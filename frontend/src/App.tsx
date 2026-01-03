import { Route, Routes } from "react-router-dom";
import Auth from "./(public)/auth";
import PrivacyPolicy from "./(public)/privacy-policy";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
