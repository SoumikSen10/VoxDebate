import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to handle the actual login
  async function login(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Email or password does not match");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const userInfo = await response.json();
      setUserInfo(userInfo);
      toast.success("Login successful! Redirecting to homepage...");

      // Navigate to the homepage after successful login
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="w-[400px] space-y-6">
      {/* Login Title */}
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-4">
        LOG IN
      </h1>

      {/* Form */}
      <form className="space-y-6" onSubmit={login}>
        {/* Email Field */}
        <div className="flex flex-col">
          <Label htmlFor="email" className="text-sm mb-2">
            Sign in with email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <Label htmlFor="password" className="text-sm mb-2">
            Enter password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="********"
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-bold"
        >
          Log in
        </Button>
      </form>

      {/* Divider for Social Login */}
      <div className="text-center text-sm text-gray-300 mt-6">
        Or continue with
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <Button className="bg-gray-700 text-white px-6 py-2 rounded-full">
          Google
        </Button>
        <Button className="bg-blue-600 text-white px-6 py-2 rounded-full">
          Facebook
        </Button>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-6">
        By registering, you agree to our{" "}
        <span className="underline">Terms and Conditions</span>.
      </p>
    </div>
  );
};

export default LoginCard;
