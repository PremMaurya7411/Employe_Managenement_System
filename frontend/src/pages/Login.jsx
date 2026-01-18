import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- new state
  const [error, setError] = useState(null);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate(); // fixed typo

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        console.log('response.data', response.data)
        if (response.data.user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  // Show loading while checking auth state
  if (loading) {
    return <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen flex items-center justify-center">
      <div className="text-white text-lg">Loading...</div>
    </div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-gray-800">Employee Management System</div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
        {error && <p className='text-red-500'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2 relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"} // <-- toggle here
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-right mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Login;
