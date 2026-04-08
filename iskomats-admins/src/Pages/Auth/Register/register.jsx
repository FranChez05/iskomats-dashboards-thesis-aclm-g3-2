import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaGraduationCap, FaUserPlus, FaPhone, FaIdCard, FaSchool } from "react-icons/fa";
import lipaBg from "../../../assets/lipa.jpg";
import logo from "../../../assets/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentId: "",
    school: "",
    role: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
    error: "",
    agreement: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      error: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, isLoading: true });

    // Basic validation
    if (!formData.role) {
      setFormData({
        ...formData,
        error: "Please enter a scholarship program",
        isLoading: false
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        error: "Passwords do not match",
        isLoading: false
      });
      return;
    }

    if (!formData.agreement) {
      setFormData({
        ...formData,
        error: "Please agree to the terms and conditions",
        isLoading: false
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      const fullName = `${formData.firstName} ${formData.lastName}`;
      localStorage.setItem('userName', fullName);
      localStorage.setItem('userFirstName', formData.firstName);
      localStorage.setItem('userLastName', formData.lastName);

      alert(`Registration successful for ${formData.role} scholarship! Please check your email for verification.`);
      // Handle successful registration (redirect, etc.)
      setFormData({ ...formData, isLoading: false });
    }, 1500);
  };

  const togglePassword = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field]
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${lipaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Black Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Card */}
      <div className="w-full max-w-3xl relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left Side - Header */}
            <div className="bg-gradient-to-r from-[#800020] to-[#650018] p-6 lg:p-7 text-center lg:w-2/5 flex flex-col justify-center items-center border-r border-white/10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20 p-2">
                <img src={logo} alt="Iskomats Logo" className="w-full h-full object-contain" />
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                Create Account
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Join Iskomats Scholarship Program
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 sm:p-5 lg:p-6 lg:w-3/5">
              {formData.error && (
                <div className="bg-red-600 text-white p-3 rounded-xl mb-5 text-sm text-center">
                  {formData.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-semibold">
                      First Name
                    </label>
                    <div className="relative mt-2">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm font-semibold">
                      Last Name
                    </label>
                    <div className="relative mt-2">
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-300" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-white text-sm font-semibold">
                    Email Address
                  </label>
                  <div className="relative mt-2">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-300" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Scholarship Input */}
                <div>
                  <label className="text-white text-sm font-semibold">
                    What role scholarship are you?
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Enter scholarship role"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-semibold">
                      Password
                    </label>
                    <div className="relative mt-2">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-300" />
                      <input
                        type={formData.showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("showPassword")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-white"
                      >
                        {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm font-semibold">
                      Confirm Password
                    </label>
                    <div className="relative mt-2">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-300" />
                      <input
                        type={formData.showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm"
                        required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("showConfirmPassword")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-white"
                      >
                        {formData.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={formData.isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#800020] to-[#650018] text-white font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition disabled:opacity-60 shadow-lg shadow-black/20"
                >
                  {formData.isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FaUserPlus />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="pt-4 text-center border-t border-white/20 mt-4 text-sm text-white/80">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="font-bold hover:underline">
                    Sign in
                  </a>
                </p>
                <p className="text-xs text-white/60 mt-1">
                  2025 Iskomats Scholarships
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;