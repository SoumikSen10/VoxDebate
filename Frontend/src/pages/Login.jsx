import React from "react";

import LoginCard from "../components/LoginCard";

const Login = () => {
  return (
    <div className="flex justify-center mt-20 w-full">
      <div className="w-1/2">Login Hero</div>
      <LoginCard className="w-1/2" />
    </div>
  );
};

export default Login;
