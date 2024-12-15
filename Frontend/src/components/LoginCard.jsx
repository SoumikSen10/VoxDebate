import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginCard = () => {
  return (
    <div className="w-[400px] space-y-6">
      {/* Login Title */}
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-4">
        LOG IN
      </h1>

      {/* Form */}
      <form className="space-y-6">
        {/* Email Field */}
        <div className="flex flex-col">
          <Label htmlFor="email" className="text-sm mb-2">
            Sign in with email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="youname@gmail.com"
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <Label htmlFor="password" className="text-sm mb-2">
            Your breakthrough
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className="rounded-full px-4 py-3 bg-[#2a1a3e] text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Login Button */}
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-bold">
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
