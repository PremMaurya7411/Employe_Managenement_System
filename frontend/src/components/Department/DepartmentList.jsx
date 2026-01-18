import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Modal states
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const deptData = response.data.data.map((dept, index) => ({
            _id: dept._id,
            sno: index + 1,
            name: dept.dep_name,
          }));
          setDepartments(deptData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // 🔹 Open modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // 🔹 Confirm delete
  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/departments/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setDepartments((prev) =>
          prev
            .filter((dept) => dept._id !== deleteId)
            .map((dept, index) => ({ ...dept, sno: index + 1 }))
        );
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Error deleting department");
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Departments
        </h2>

        <Link to="/admin-dashboard/add-department">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
            Add New Department
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">S No</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept._id}>
                  <td className="border px-4 py-2">{dept.sno}</td>
                  <td className="border px-4 py-2">{dept.name}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <Link
                      to={`/admin-dashboard/department/${dept._id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDeleteClick(dept._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔴 Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Semi-transparent background */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setShowModal(false)} // close modal if background clicked
          ></div>

          {/* Modal box */}
          <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              This action will permanently delete the department.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DepartmentList;
