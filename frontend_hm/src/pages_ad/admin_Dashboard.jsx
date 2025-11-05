import React, { useEffect, useState } from "react";
import { getStaff, getDoctors } from "../api";
import Sidebar from "../components_ad/Sidebar";
import {
  User,
  Users,
  Briefcase,
  Stethoscope,
  Activity,
  ClipboardList,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";

export default function Dashboard() {
  const [staff, setStaff] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchStaff();
    fetchDoctors();
  }, []);

  const fetchStaff = async () => {
    const { data } = await getStaff();
    setStaff(data);
  };

  const fetchDoctors = async () => {
    const { data } = await getDoctors();
    setDoctors(data);
  };

  // Staff Stats
  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === "Active").length;
  const inactiveStaff = staff.filter((s) => s.status === "Inactive").length;
  const departments = [...new Set(staff.map((s) => s.department))].length;
  const roles = [...new Set(staff.map((s) => s.role))].length;

  // Doctor Stats
  const totalDoctors = doctors.length;
  const fullTimeDoctors = doctors.filter((d) => d.type === "Full-Time").length;
  const partTimeDoctors = doctors.filter((d) => d.type === "Part-Time").length;
  const visitingDoctors = doctors.filter((d) => d.type === "Visiting").length;
  const specializations = [
    ...new Set(doctors.map((d) => d.specialization)),
  ].length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-6 ml-64 mx-auto mt-20">
        <h1 className="text-3xl font-bold text-red-700 mb-10 text-center">
          Hospital Admin Dashboard
        </h1>

        {/* STAFF OVERVIEW */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 bg-gradient-to-r from-red-100 to-transparent p-2 rounded">
          Staff Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          <DashboardCard
            title="Total Staff"
            value={totalStaff}
            icon={<Users className="text-red-600" />}
            borderColor="border-red-500"
          />
          <DashboardCard
            title="Active Staff"
            value={activeStaff}
            icon={<UserCheck className="text-orange-500" />}
            borderColor="border-orange-400"
          />
          <DashboardCard
            title="Inactive Staff"
            value={inactiveStaff}
            icon={<UserX className="text-gray-500" />}
            borderColor="border-gray-400"
          />
          <DashboardCard
            title="Departments"
            value={departments}
            icon={<Briefcase className="text-rose-500" />}
            borderColor="border-rose-400"
          />
          <DashboardCard
            title="Roles"
            value={roles}
            icon={<ClipboardList className="text-yellow-500" />}
            borderColor="border-yellow-400"
          />
        </div>

        {/* DOCTOR OVERVIEW */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 bg-gradient-to-r from-red-100 to-transparent p-2 rounded">
          Doctor Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <DashboardCard
            title="Total Doctors"
            value={totalDoctors}
            icon={<Stethoscope className="text-sky-600" />}
            borderColor="border-sky-500"
          />
          <DashboardCard
            title="Full-time Doctors"
            value={fullTimeDoctors}
            icon={<User className="text-cyan-600" />}
            borderColor="border-cyan-500"
          />
          <DashboardCard
            title="Part-time Doctors"
            value={partTimeDoctors}
            icon={<UserPlus className="text-indigo-500" />}
            borderColor="border-indigo-400"
          />
          <DashboardCard
            title="Visiting Doctors"
            value={visitingDoctors}
            icon={<Activity className="text-blue-500" />}
            borderColor="border-blue-400"
          />
          <DashboardCard
            title="Specializations"
            value={specializations}
            icon={<ClipboardList className="text-teal-600" />}
            borderColor="border-teal-400"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, borderColor }) {
  return (
    <div
      className={`bg-white border-l-4 ${borderColor} p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-between`}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    </div>
  );
}
