import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SessionHighlights from '@/components/SessionHighlights';
// import SampleView from "@/components/sample-view";

async function Home() {


  return (
    <main className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4">
        <HeroSection />
        <FeaturesSection />
        <SessionHighlights />
        {/* <SampleView initialSamples={samples} /> */}
      </div>
    </main>
  );
}

export default Home;
