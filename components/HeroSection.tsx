"use client";

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 md:pt-[100px] mx-4 md:mx-[13px] text-center md:text-left flex items-center">
      <div className="flex flex-col md:flex-row items-center gap-5 w-full">
        {/* Left Content */}
        <div className="w-full md:w-[59%]">
          <div className="flex flex-col items-center md:items-start mt-7 md:mt-7">
            <div className="relative w-full">
              <h1 className="text-4xl md:text-[84px] font-medium leading-tight md:leading-[95px] tracking-[-6.72px] z-10">
                Empowering Students with Personalized <br />
                Mentorship
                <img
                  src="https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/831ba0f3a910c871e665be32f80c13b155906fe1?placeholderIfAbsent=true"
                  className="hidden md:block absolute z-0 w-[74px] h-[74px] right-[283px] top-[211px]"
                  alt="Decorative element"
                />
              </h1>
              <p className="mt-30 text-2xl md:text-[32px] font-normal leading-9 tracking-[-1.92px] z-10">
                EduVibe connects students with experienced mentors to guide them through their academic
              </p>
            </div>
            <button className="bg-black text-white flex items-center gap-2.5 text-2xl md:text-[32px] font-medium tracking-[-1.92px] leading-none justify-center mt-10 px-6 md:px-[35px] py-2.5 rounded-lg hover:bg-gray-800 transition-colors mx-auto md:mx-0 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        {/* <div className="w-full md:w-[41%] md:ml-5">
        <img
        src="https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/e3db4f5a7beb28059abd2a9ffffedb845d0b8302?placeholderIfAbsent=true"
        className="w-full object-contain shadow-lg md:shadow-[-96px_114px_42px_rgba(0,0,0,0)]"
        alt="Students learning with mentors"
        />
      </div> */}
        <div className="w-full md:w-[35%] md:ml-5 relative overflow-hidden max-h-[800px] cursor-pointer hover:overflow-y-auto scrollbar-hide heigh">
          <div className="grid grid-cols-3 gap-x-1 gap-y-1">
            {/* Top row */}
            <div className="col-span-1 flex justify-center">
              <div className="relative bg-[#F4E3D7] rounded-full overflow-hidden h-56 w-32 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
                  alt="Student profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-4">
              <div className="relative bg-[#3A3A3A] rounded-full overflow-hidden h-56 w-32 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <div className="relative bg-[#F9F0E7] rounded-full overflow-hidden h-60 w-30 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Middle row */}
            <div className="col-span-1 -mt-2">
              <div className="relative bg-[#8D7B68] rounded-full overflow-hidden h-60 w-30 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-6">
              <div className="relative bg-[#424242] rounded-full overflow-hidden h-68 w-36 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-8">
              <div className="relative bg-[#FFB74D] rounded-full overflow-hidden h-60 w-30 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="col-span-1">
              <div className="relative bg-[#E0E0E0] rounded-full overflow-hidden h-52 w-28 mt-2 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-3">
              <div className="relative bg-[#A5D6A7] rounded-full overflow-hidden h-56 w-30 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 -mt-4">
              <div className="relative bg-[#4FC3F7] rounded-full overflow-hidden h-56 w-30 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Additional cards to make it scrollable */}
            <div className="col-span-1 mt-2">
              <div className="relative bg-[#EF9A9A] rounded-full overflow-hidden h-60 w-32 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-6">
              <div className="relative bg-[#CE93D8] rounded-full overflow-hidden h-64 w-34 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
                  alt="Google Logo"
                  className="absolute bottom-2 right-2 w-6 h-6 opacity-75"
                />

              </div>
            </div>
            <div className="col-span-1 mt-4">
              <div className="relative bg-[#90CAF9] rounded-full overflow-hidden h-56 w-30 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
                  alt="Google Logo"
                  className="absolute bottom-2 right-2 w-6 h-6 opacity-75"
                />
              </div>
            </div>
          </div>

          {/* Apply styles to hide scrollbar */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

      </div>

      {/* Gradient fade to next section */}
      <div
        className="absolute left-0 right-0 bottom-[-1px] h-60 bg-gradient-to-b 
             from-white via-[#F4F4F4]/50 to-[#F4F4F4] pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
        }}
      >
      </div>
    </section>
  );
};

export default HeroSection;
