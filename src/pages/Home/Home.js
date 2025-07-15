// HomePage.jsx

import HeroSection from "./HeroSection/HeroSection.js";
import CutomerFeebackSection from "./CustomerFeedback/CustomerFeedback.js";
import FitnessInformation from "./FitnessInformation/FitnessInformation.js";



export default function HomePage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <HeroSection />
        <FitnessInformation />
        <CutomerFeebackSection />
      </section>
    </div>
  );
}
