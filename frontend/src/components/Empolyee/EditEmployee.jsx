import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    department: "", // MUST be ObjectId string
  });
  const [errors, setErrors] = useState({});

  // Fetch departments + employee
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [deptRes, empRes] = await Promise.all([
          api.get("/departments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/employees/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (deptRes.data.success) {
          setDepartments(deptRes.data.data);
        }

        if (empRes.data.success) {
          const emp = empRes.data.data;
          emp.department = emp.department?._id || "";
          setForm(emp);
        }
      } catch (error) {
        toast.error("Failed to load employee data");
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!emailRegex.test(form.email)) newErrors.email = "Valid email is required";
    if (!form.department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        department: form.department, // MUST be ObjectId string
      };

      const res = await api.put(`/employees/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Employee updated successfully");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Validation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Employee</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 space-y-4"
      >
        {/* First Name */}
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Department (Controlled — NO selected on option) */}
        <div>
          <label className="block font-medium mb-1">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id} selected={form.department === dept._id}>
                {dept.dep_name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
