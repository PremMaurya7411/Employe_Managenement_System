import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function AddDepartment() {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await api.post('/departments', department,{
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        });
        if(response.data.success){
            navigate('/admin-dashboard/departments');
        }
        // console.log("Department added successfully:", response.data);
    } catch(error){
      console.error("Error adding department:", error);
    }
    console.log(department); // API call later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add New Department
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Department Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              placeholder="Department Name"
              value={department.dep_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={department.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-medium transition"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;
