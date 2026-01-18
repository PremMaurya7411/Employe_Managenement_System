import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const totalPages = Math.ceil(total / limit);

  const fetchEmployees = async (currentPage = page) => {
    try {
      setLoading(true);
      const response = await api.get("/employees", {
        params: { page: currentPage, limit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {

        const empData = response.data.data.map((emp, index) => ({
          _id: emp._id,
          sno: (currentPage - 1) * limit + index + 1,
          name: `${emp.first_name} ${emp.last_name}`,
          email: emp.email,
          department: emp.department.dep_name || "N/A",
        }));

        setEmployees(empData);
        setTotal(response.data.total);
        setPage(currentPage);
      }
    } catch (error) {
    //   console.error("Fetch error:", error);
    toast.error("Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(1);
  }, []);

  // Delete handling
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/employees/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success("Employee deleted successfully");

        fetchEmployees(page);
      } else {
        // alert("Delete failed");
        toast.error("Error deleting employee");
      }
    } catch (error) {
    //   alert("Error deleting employee");
        toast.error("Error deleting employee");
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
          Manage Employees
        </h2>

        <Link to="/admin-dashboard/add-employee">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
            Add New Employee
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">S No</th>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td className="border px-4 py-2">{emp.sno}</td>
                  <td className="border px-4 py-2">{emp.name}</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.department}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <Link
                      to={`/admin-dashboard/employee/${emp._id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDeleteClick(emp._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => fetchEmployees(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchEmployees(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10">
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              This action will permanently delete the employee.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
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

export default EmployeeList;
