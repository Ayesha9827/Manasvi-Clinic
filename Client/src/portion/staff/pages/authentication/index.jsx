import React, { useState } from "react";
import axios from "axios";
import AuthImage2 from '../authentication/staff.jpg'; 

// Ensure axios is installed by running: npm install axios
// If you're using a development environment that supports it, you can add a comment like:
// @ts-ignore
// import axios from 'axios';

const AuthPage = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errors, setErrors] = useState({}); // State for storing validation

  // Function to validate form inputs
  const validateForm = () => {
    let formErrors = {}; // Object to hold validation errors

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format
    if (!email) {
      formErrors.email = "Email is required"; // Check if email is provided
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format"; // Check if email matches the regex
    }

    if (!password) {
      formErrors.password = "Password is required"; // Check if password is provided
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters"; // Check password length
    }

    return formErrors; // Return any validation errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrors({}); // Reset errors
    const validationErrors = validateForm(); // Validate form inputs
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return; 
    }

    try {
      const response = await axios.post("/login", { email, password }); // Handle sign-in
      console.log("Sign In Success:", response.data); 
    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side Form Section */}
      <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"> {/* Form box for sign-in */}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800"> {/* Darker text for heading */}
            Sign In
          </h2>
          <p className="mb-4 text-center text-gray-700"> {/* Darker text for paragraph */}
            Welcome back, you've been missed!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="name@example.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right Side Image and Content Section */}
      <div className="md:w-1/2 bg-blue-600 flex flex-col items-center justify-center p-10 text-white">
        <div className="flex flex-col items-center">
          <img
            src={AuthImage2}
            alt="Auth Illustration"
            className="w-1/3 max-w-sm mb-4" // Adjust image size here
          />
          <h1 className="text-3xl font-bold mb-2">Join Us Today!</h1>
          <p className="text-lg text-center">
            Start turning your ideas into reality. Sign now and take advantage
            of a wealth of information that will help you improve your business
            and stay ahead of the competition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;