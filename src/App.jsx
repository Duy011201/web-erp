import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Forgot from "./pages/auth/forgot/Forgot";
import Home from "./pages/home/Home";
import NoPage from "./pages/nopage/NoPage";
import Store from "./pages/store/Store";
import Product from "./pages/product/Product";
import Material from "./pages/material/Material";
import WarehouseReceipt from "./pages/warehouse-receipt/WarehouseReceipt";
import Personal from "./pages/personal/Personal";
import Employee from "./pages/employee/Employee";
import Department from "./pages/department/Department";
import Position from "./pages/position/Position";
import WorkingProcess from "./pages/workingprocess/Workingprocess";
import RewardDiscipline from "./pages/reward-discipline/RewardDiscipline";
import Dashboard from "./pages/dashboard/Dashboard";
import WarehouseExport from "./pages/warehouse-export/WarehouseExport";
import Report from "./pages/report/Report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<Product />} />
        <Route path="/material" element={<Material />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/warehouse-receipt" element={<WarehouseReceipt />} />
        <Route path="/warehouse-export" element={<WarehouseExport />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/position" element={<Position />} />
        <Route path="/department" element={<Department />} />
        <Route path="/workingprocess" element={<WorkingProcess />} />
        <Route path="/reward-discipline" element={<RewardDiscipline />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
