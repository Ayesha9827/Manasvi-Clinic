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
    <></>
  );
};

export default AuthPage;