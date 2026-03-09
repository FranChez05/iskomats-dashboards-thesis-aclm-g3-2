import { useState } from "react";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaSignInAlt,
  FaGlobeAfrica,
  FaUserGraduate,
  FaHandsHelping,
} from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    showPassword: false,
    isLoading: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  const togglePassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, isLoading: true });

    setTimeout(() => {
      // Test credentials for different scholarship programs:
      // Email: admin@iskomats.com | Password: admin123 | Role: admin
      // Email: africa@iskomats.com | Password: admin123 | Role: africa
      // Email: vilma@iskomats.com | Password: admin123 | Role: vilma
      // Email: tulong@iskomats.com | Password: admin123 | Role: tulong
      
      // Simulate login validation
      if (
        formData.email === "admin@iskomats.com" ||
        formData.email === "africa@iskomats.com" ||
        formData.email === "vilma@iskomats.com" ||
        formData.email === "tulong@iskomats.com"
      ) {
        if (formData.password === "admin123") {
          // Save authentication data to localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', formData.role || '');
          localStorage.setItem('userEmail', formData.email);
          
          // For demo purposes, set a default name if not already stored
          if (!localStorage.getItem('userName')) {
            localStorage.setItem('userName', 'Admin User');
            localStorage.setItem('userFirstName', 'Admin');
            localStorage.setItem('userLastName', 'User');
          }
          
          // Navigate based on entered role
          switch (formData.role) {
            case 'admin':
            case 'main':
              window.location.href = '/dash';
              break;
            case 'africa':
              window.location.href = '/dash-africa';
              break;
            case 'vilma':
              window.location.href = '/dash-vilma';
              break;
            case 'tulong':
              window.location.href = '/dash-tulong';
              break;
            default:
              // If no role or invalid role, go to main dashboard
              window.location.href = '/dash';
          }
        } else {
          setFormData({
            ...formData,
            error: "Invalid email or password",
            isLoading: false,
          });
        }
      } else {
        setFormData({
          ...formData,
          error: "Invalid email or password",
          isLoading: false,
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 bg-gradient-to-br from-red-900 via-red-800 to-red-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left Side - Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 p-6 lg:p-8 text-center lg:text-left lg:w-2/5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <FaGraduationCap className="text-2xl sm:text-3xl lg:text-4xl text-white" />
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Sign in to your Iskomats account
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 sm:p-6 lg:p-8 lg:w-3/5">
            {formData.error && (
              <div className="bg-red-600 text-white p-4 rounded-xl mb-6 text-sm text-center">
                {formData.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label className="text-white text-sm font-semibold">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Role Input */}
              <div>
                <label className="text-white text-sm font-semibold">
                  Role
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter your role "
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-white text-xs font-semibold">
                  Password
                </label>
                <div className="relative mt-2">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300" />
                  <input
                    type={formData.showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-red-300"
                  >
                    {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-sm text-white/80">
                <a href="/forget-password" className="hover:underline hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={formData.isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-800 to-red-700 text-white font-bold flex items-center justify-center gap-3 hover:-translate-y-1 transition disabled:opacity-60"
              >
                {formData.isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="pt-6 text-center border-t border-white/20 mt-6 text-sm text-white/80">
              <p>
                Don't have an account?{" "}
                <a href="/register" className="font-bold hover:underline">
                  Create account
                </a>
              </p>
              <p className="text-xs text-white/60 mt-2">
                &copy; 2025 Iskomats Scholarships
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
