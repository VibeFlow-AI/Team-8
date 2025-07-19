import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative mt-[160px] mx-[13px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10 text-center md:text-left">
      <div className="gap-5 flex max-md:flex-col items-center md:items-stretch">
        {/* Left Content */}
        <div className="w-[59%] max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-center md:items-start mt-7 max-md:max-w-full max-md:mt-10">
            <div className="relative w-full text-black max-md:max-w-full">
              <h1 className="text-[84px] font-medium leading-[95px] tracking-[-6.72px] z-0 max-md:max-w-full max-md:text-[40px] max-md:leading-[50px] text-center md:text-left">
                Empowering Students with Personalized <br />
                Mentorship
                <img
                  src="https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/831ba0f3a910c871e665be32f80c13b155906fe1?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[74px] absolute z-0 h-[74px] right-[283px] top-[211px]"
                  alt="Decorative element"
                />
              </h1>
              <p className="text-[32px] font-normal leading-9 tracking-[-1.92px] z-0 mt-[140px] max-md:max-w-full max-md:mt-10 text-center md:text-left">
                EduVibe connects students with experienced mentors to guide
                them through their academic
              </p>
            </div>
            <button className="bg-black flex items-center gap-2.5 text-[32px] text-[rgba(216,216,216,1)] font-medium tracking-[-1.92px] leading-none justify-center mt-[50px] px-[35px] py-2.5 rounded-[9px] max-md:mt-10 max-md:px-5 hover:bg-gray-800 transition-colors mx-auto md:mx-0">
              <div className="self-stretch my-auto">Get Started</div>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-[41%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/e3db4f5a7beb28059abd2a9ffffedb845d0b8302?placeholderIfAbsent=true"
            className="aspect-[0.77] object-contain w-full shadow-[-96px_114px_42px_rgba(0,0,0,0)] grow max-md:max-w-full max-md:mt-8"
            alt="Students learning with mentors"
          />
        </div>
      </div>

      {/* Gradient fade to next section */}
      <div
        className="absolute left-0 right-0 bottom-[-1px] h-60 
                   bg-gradient-to-b from-white via-[#F4F4F4]/50 to-[#F4F4F4] 
                   pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
        }}
      />
    </section>
  );
};

export default HeroSection;
