import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    dep_name: "",
    description: "",
  });
  console.log(form);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [deptRes] = await Promise.all([
         api.get(`/departments/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        console.log(deptRes);
        if (deptRes.data.success) {
          // console.log(deptRes.data);
          const department = deptRes.data.data;
          setForm(department);
        }
      } catch (error) {
        toast.error("Failed to load department data");
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
    if (!form.dep_name.trim()) newErrors.dep_name = "Department name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
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
        dep_name: form.dep_name.trim(),
        description: form.description.trim(),
      };

      const res = await api.put(`/departments/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Department updated successfully");
        navigate("/admin-dashboard/departments");
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
      <h2 className="text-2xl font-semibold mb-6">Edit Deparment</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 space-y-4"
      >
        {/* Department Name */}
        <div>
          <label className="block font-medium mb-1">Department Name</label>
          <input
            name="dep_name"
            value={form.dep_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.dep_name && (
            <p className="text-red-500 text-sm">{errors.dep_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium mb-1"> Description</label>
           <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name}</p>
          )}
        </div>

  

        {/* Submit */}
        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Department"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;
