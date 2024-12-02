import React from "react";

import SignupCard from "../components/SignupCard";

const Signup = () => {
  return (
    <div className="flex justify-center mt-20 w-full">
      <div className="w-1/2">Signup Hero</div>
      <SignupCard className="w-1/2" />
    </div>
  );
};

export default Signup;
