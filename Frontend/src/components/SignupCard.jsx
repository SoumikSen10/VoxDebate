import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignupCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill out all fields", { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        { name: username, email, password },
        { withCredentials: true }
      );

      if (response.data) {
        setUserInfo(response.data);
        toast.success("Signup successful! Redirecting to homepage...", {
          autoClose: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="w-[400px] space-y-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-4">
        SIGN UP
      </h1>
      <form className="space-y-6" onSubmit={signup}>
        <div className="flex flex-col">
          <Label htmlFor="username" className="text-sm mb-2">
            Choose a username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email" className="text-sm mb-2">
            Enter a valid email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="password" className="text-sm mb-2">
            Enter password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-bold"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignupCard;
