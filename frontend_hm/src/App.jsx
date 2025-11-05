import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components_ad/Nav";
import Sidebar from "./components_ad/Sidebar";
import Dashboard from "./pages_ad/admin_Dashboard";
import StaffList from "./pages_ad/staff_list";
import StaffForm from "./pages_ad/staff_form";
import DoctorList from "./pages_ad/doc_list";
import AddDoctor from "./pages_ad/doc_form";
import PharmList from "./pages_ad/pharma_list";
import PharmaForm from "./pages_ad/pharma_form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Navigate to="/admin_Dashboard" />} />
        <Route path="/admin_Dashboard" element={<Dashboard />} />
        <Route path="/staff" element={<StaffList />} />
        <Route path="/staff/add" element={<StaffForm />} />
        <Route path="/staff/edit/:id" element={<StaffForm />} />
        <Route path="/doctor" element={<DoctorList />} />
        <Route path="/doctor/add" element={<AddDoctor />} /> 
        <Route path="/doctor/edit/:id"element={<AddDoctor/>}/> 
        <Route path="/pharma" element={<PharmList />} />
        <Route path="/pharma/add" element={<PharmaForm />} />
        <Route path="/pharma/edit/:id" element={<PharmaForm />} />
 
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </Router>
  );
}

export default App;
