"use client";

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative pt-20 md:pt-[120px] mx-4 md:mx-[13px] text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center gap-5">
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
              <p className="mt-10 text-2xl md:text-[32px] font-normal leading-9 tracking-[-1.92px] z-10">
                EduVibe connects students with experienced mentors to guide them through their academic
              </p>
            </div>
            <button className="bg-black text-white flex items-center gap-2.5 text-2xl md:text-[32px] font-medium tracking-[-1.92px] leading-none justify-center mt-10 px-6 md:px-[35px] py-2.5 rounded-lg hover:bg-gray-800 transition-colors mx-auto md:mx-0">
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
        <div className="w-full md:w-[41%] md:ml-5 relative overflow-hidden max-h-[600px] cursor-pointer hover:overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-3 gap-x-1 gap-y-2">
            {/* Top row */}
            <div className="col-span-1 flex justify-center">
              <div className="bg-[#F4E3D7] rounded-full overflow-hidden h-52 w-32">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                  alt="Student profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-4">
              <div className="bg-[#3A3A3A] rounded-full overflow-hidden h-52 w-32">
                <img
                  src="https://source.unsplash.com/random/300x300/?student,profile"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <div className="bg-[#F9F0E7] rounded-full overflow-hidden h-56 w-30">
                <img
                  src="https://source.unsplash.com/random/300x300/?mentor,woman"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Middle row */}
            <div className="col-span-1 -mt-2">
              <div className="bg-[#8D7B68] rounded-full overflow-hidden h-56 w-30">
                <img
                  src="https://source.unsplash.com/random/300x300/?student,man"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-6">
              <div className="bg-[#424242] rounded-full overflow-hidden h-64 w-36">
                <img
                  src="https://source.unsplash.com/random/300x300/?teacher,professional"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-8">
              <div className="bg-[#FFB74D] rounded-full overflow-hidden h-56 w-30">
                <img
                  src="https://source.unsplash.com/random/300x300/?student,asian"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="col-span-1">
              <div className="bg-[#E0E0E0] rounded-full overflow-hidden h-48 w-28 mt-2">
                <img
                  src="https://source.unsplash.com/random/300x300/?student,african"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-3">
              <div className="bg-[#A5D6A7] rounded-full overflow-hidden h-52 w-30">
                <img
                  src="https://source.unsplash.com/random/300x300/?student,graduate"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 -mt-4">
              <div className="bg-[#4FC3F7] rounded-full overflow-hidden h-52 w-30">
                <img
                  src="https://source.unsplash.com/random/300x300/?tutor,education"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Additional cards to make it scrollable */}
            <div className="col-span-1 mt-2">
              <div className="bg-[#EF9A9A] rounded-full overflow-hidden h-56 w-32">
                <img
                  src="https://source.unsplash.com/random/300x300/?student,college"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-6">
              <div className="bg-[#CE93D8] rounded-full overflow-hidden h-60 w-34">
                <img
                  src="https://source.unsplash.com/random/300x300/?mentor,expert"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 mt-4">
              <div className="bg-[#90CAF9] rounded-full overflow-hidden h-52 w-30">
                <img
                  src="https://source.unsplash.com/random/300x300/?teacher,university"
                  alt="Profile"
                  className="w-full h-full object-cover"
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
      />
    </section>
  );
};

export default HeroSection;
