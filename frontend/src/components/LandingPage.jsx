import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import WorkSection from "./WorkSection";
import ServicesSection from "./ServicesSection";
import WhyUsSection from "./WhyUsSection";
import TestimonialsSection from "./TestimonialsSection";
import PlansSection from "./PlansSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <PlansSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;