import React from 'react';
import MentorCard from './MentorCard';

const SessionHighlights = () => {
  const mentors = [
    {
      initials: "CR",
      initialsColor: "rgba(255,149,0,1)",
      name: "Chathum Rahal",
      location: "Galle",
      subjects: ["Mathematics", "History", "English"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "1 hour",
      language: "English",
      imageSrc: "https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/6184a5219b55414eed291bfd8dc4a5b0966b7fb3?placeholderIfAbsent=true",
      buttonImageSrc: "https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/f5d255d8bc24bf00931fdcb032ed08a5b752c288?placeholderIfAbsent=true"
    },
    {
      initials: "MI",
      initialsColor: "rgba(217,0,255,1)",
      name: "Malsha Fernando",
      location: "Colombo",
      subjects: ["Chemistry", "Art", "Commerce"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "1 hour",
      language: "Sinhala",
      imageSrc: "https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/6b8dcceb60b2bd2b19d0afbfd3577580954aec5e?placeholderIfAbsent=true",
      buttonImageSrc: "https://api.builder.io/api/v1/image/assets/484661aae812476b9c92cb43f8249b88/3457c926e593a14d56eb1415ef1f823b2368f1e8?placeholderIfAbsent=true"
    }
  ];

  return (
    <section>
      <h2 className="text-black text-[66px] font-medium leading-none tracking-[-3.96px] text-center mt-[177px] max-md:max-w-full max-md:text-[40px] max-md:mt-10">
        Session Highlights – Trending Now
      </h2>
      <p className="text-black text-[32px] font-normal leading-9 tracking-[-1.92px] text-center mt-6 max-md:max-w-full">
        Join the sessions students are raving about. These expert-led,
        high-impact sessions are designed to help you unlock your full
        potential whether you're polishing your resume, mapping out your
        career path, or getting ready to ace technical interviews.
      </p>
      <div className="mt-16 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {mentors.map((mentor, index) => (
            <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
              <MentorCard {...mentor} />
            </div>
          ))}
        </div>
      </div>
      <button className="justify-center items-center flex gap-[7px] text-xl text-[#1D1D1B] font-medium tracking-[-1.2px] leading-none ml-[54px] mt-16 px-2.5 py-3 rounded-[4.477px] border-[0.746px] border-solid border-[#434343] max-md:ml-2.5 max-md:mt-10 hover:bg-gray-100 transition-colors">
        <div className="text-[#1D1D1B] self-stretch my-auto">
          Load More Sessions
        </div>
      </button>
    </section>
  );
};

export default SessionHighlights;
