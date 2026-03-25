import React from "react";
import Navbar from "./landingPage/Navbar";
import HeroSection from "./landingPage/HeroSection";
import FeatureSection from "./landingPage/FeatureSection";
import UsecaseSection from "./landingPage/UsecaseSection";
import BlogSection from "./landingPage/BlogSection";
import FAQs from "./landingPage/FAQs";
import FooterSection from "./landingPage/FooterSection";

function LandingPage() {
  return (
    <>
    <Navbar/>
      <main className="w-full overflow-hidden">
        <HeroSection />
        <FeatureSection />
        <UsecaseSection />
        <BlogSection />
        <FAQs />
      </main>
      <FooterSection />
    </>
  );
}

export default LandingPage;
