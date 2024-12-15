import React from "react";
import ManualAccordion from "@/components/ManualAccordion";
import ManualSearch from "@/components/ManualSearch";

const Manual = () => {
  return (
    <div className="mt-8 ml-12">
      <ManualSearch />
      <ManualAccordion />
    </div>
  );
};

export default Manual;
