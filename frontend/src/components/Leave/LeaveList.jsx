import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";

function LeaveList() {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const fetchLeaves = async (currentPage = page) => {
    try {
      setLoading(true);
      const response = await api.get("/leaves", {
        params: { page: currentPage, limit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setLeaves(response.data.data);
        setTotal(response.data.total || response.data.data.length);
        setPage(currentPage);
      }
    } catch (error) {
      toast.error("Error fetching leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(1);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;

    try {
      const res = await api.delete(`/leaves/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        toast.success("Leave deleted successfully");
        fetchLeaves(page);
      } else {
        toast.error("Failed to delete leave");
      }
    } catch (error) {
      toast.error("Error deleting leave");
    }
  };

  const formatDateTime = (value) =>
    new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div>
      {loading && <div>Loading...</div>}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Leave Management
        </h2>

        <button
          onClick={() => navigate("/admin-dashboard/add-leave")}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Add Leave
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">S No</th>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Leave Type</th>
              <th className="border px-4 py-2">Duration</th>
              {/* <th className="border px-4 py-2">Start</th>
              <th className="border px-4 py-2">End</th> */}
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={leave._id}>
                  <td className="border px-4 py-2">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border px-4 py-2">
                    {leave.employee_id?.first_name} {leave.employee_id?.last_name}
                  </td>
                  <td className="border px-4 py-2">
                    {leave.employee_id?.email}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {leave.leave_type}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {leave.leave_duration}
                  </td>
                  {/* <td className="border px-4 py-2">
                    {formatDateTime(leave.start_datetime)}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDateTime(leave.end_datetime)}
                  </td> */}
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${
                        leave.status === "APPROVED"
                          ? "bg-green-600"
                          : leave.status === "REJECTED"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin-dashboard/edit-leave/${leave._id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(leave._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No leaves found
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
            onClick={() => fetchLeaves(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchLeaves(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default LeaveList;