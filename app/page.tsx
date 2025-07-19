import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SessionHighlights from '@/components/SessionHighlights';
// import SampleView from "@/components/sample-view";
import { prisma } from "@/lib/prisma";

async function Home() {
  // This demonstrates SSR - data is fetched on the server
  const samples = await prisma.sample.findMany();

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
