import React from "react";
import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import AboutCard from "@/components/AboutCard";

const About = () => {
  return (
    <div className="mt-28 px-6 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12">
      <AboutCard
        name="Rhitam Chaudhury"
        designation="Frontend Developer"
        linkedin="https://linkedin.com/in/rhitamchaudhury"
        github="https://github.com/rhitamchaudhury"
        twitter="https://twitter.com/rhitamchaudhury"
        image={image2}
      />
      <AboutCard
        name="Soumik Sen"
        designation="Backend Developer"
        linkedin="https://linkedin.com/in/soumiksen"
        github="https://github.com/soumiksen"
        twitter="https://twitter.com/soumiksen"
        image={image1}
      />
    </div>
  );
};

export default About;
