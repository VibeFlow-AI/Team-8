import React from 'react';

interface MentorCardProps {
  initials: string;
  initialsColor: string;
  name: string;
  location: string;
  subjects: string[];
  description: string;
  duration: string;
  language: string;
  imageSrc: string;
  buttonImageSrc: string;
}

const MentorCard = ({
  initials,
  initialsColor,
  name,
  location,
  subjects,
  description,
  duration,
  language,
  imageSrc,
  buttonImageSrc
}: MentorCardProps) => {
  return (
    <article className="flex flex-col relative min-h-[554px] w-full items-stretch pt-7 pb-3.5 px-[19px] rounded-[25px] max-md:max-w-full max-md:mt-[31px] max-md:pr-5">
      <img
        src={imageSrc}
        className="absolute h-full w-full object-cover inset-0"
        alt={`${name} mentor profile`}
      />
      <div className="relative min-h-[425px]">
        <div className="flex w-full flex-col items-stretch leading-none">
          <div className="flex w-full items-center gap-[21px] justify-center">
            <div className="self-stretch text-2xl font-normal whitespace-nowrap text-center tracking-[-1.46px] w-[84px] my-auto rounded-xl" style={{ color: initialsColor }}>
              <div className="bg-[rgba(244,244,244,1)] flex flex-col items-center w-[84px] justify-center h-[84px] px-[31px] rounded-xl max-md:px-5">
                <div>{initials}</div>
              </div>
            </div>
            <div className="self-stretch flex min-w-60 flex-col w-[279px] my-auto pr-14 rounded-[0px_0px_0px_0px]">
              <h3 className="text-black text-2xl font-medium tracking-[-1.46px]">
                {name}
              </h3>
              <p className="text-[rgba(143,143,143,1)] text-[15px] font-normal tracking-[-0.9px] mt-[9px]">
                {location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[7px] text-[15px] text-black font-light whitespace-nowrap tracking-[-0.91px] mt-[25px]">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-[rgba(231,231,231,1)] border self-stretch flex items-center gap-2 justify-center my-auto pl-2 pr-[7px] py-2 rounded-[5px] border-[rgba(213,213,213,1)] border-solid">
                <div className="self-stretch my-auto">
                  {subject}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full text-black mt-5">
          <div className="w-full text-xl font-light tracking-[-1.22px] leading-[26px]">
            <p>{description}</p>
          </div>
          <div className="w-full text-[15px] tracking-[-0.91px] leading-none mt-6">
            <div className="flex w-full items-center gap-[9px]">
              <div className="font-medium self-stretch w-[60px] my-auto">
                Duration:
              </div>
              <div className="font-light self-stretch w-[286px] my-auto">
                {duration}
              </div>
            </div>
            <div className="flex w-full items-center gap-[9px] mt-2.5">
              <div className="font-medium self-stretch w-[139px] my-auto">
                Preferred Language:
              </div>
              <div className="font-light self-stretch w-[286px] my-auto">
                {language}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-center flex w-[348px] max-w-full items-stretch gap-2 text-xl text-white font-medium tracking-[-1.22px] leading-none mt-9">
        <button className="justify-center items-center bg-[#1D1D1B] flex min-h-[49px] gap-2 grow shrink basis-auto px-2 py-[13px] rounded-[4.537px] border-[0.756px] border-solid border-[#D5D5D5] hover:bg-gray-700 transition-colors">
          <div className="self-stretch my-auto">
            Book a session
          </div>
        </button>
        <img
          src={buttonImageSrc}
          className="aspect-[0.98] object-contain w-[49px] shrink-0"
          alt="Book session icon"
        />
      </div>
    </article>
  );
};

export default MentorCard;
