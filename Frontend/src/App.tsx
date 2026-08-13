import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/landingPage/LandingPage'
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Transactions } from "./pages/transactions/Transactions";
import { NewTransaction } from "./pages/transactions/NewTransaction";
import { Accounts } from "./pages/accounts/Accounts";
import { NewAccount } from "./pages/accounts/NewAccount";

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/newTransaction" element={<NewTransaction />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/newAccount" element={<NewAccount />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
