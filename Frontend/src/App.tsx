import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/landingPage/LandingPage'
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { Dashboard } from "./pages/dashboard/Dashboard";

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
