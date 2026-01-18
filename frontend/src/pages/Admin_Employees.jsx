import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmployeeList from '../components/Empolyee/EmployeeList';

function Employees() {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
    <EmployeeList />
    </div>
  )
}

export default Employees
