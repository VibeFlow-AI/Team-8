import React from 'react';

interface FeatureCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
}

const FeatureCard = ({ title, description, imageSrc, imageAlt }: FeatureCardProps) => {
  return (
    <article className="flex flex-col relative aspect-[0.41] grow text-[32px] text-black font-medium tracking-[-1.92px] leading-9 pt-[202px] rounded-[30px] max-md:mt-[17px] max-md:pt-[100px]">
      <img
        src={imageSrc}
        className="absolute h-full w-full object-cover inset-0"
        alt={imageAlt}
      />
      <div className="relative flex flex-col pt-[263px] pb-[35px] px-[26px] rounded-[0px_0px_30px_30px] max-md:pt-[100px] max-md:px-5">
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        {description && (
          <p className="text-2xl font-light leading-[27px] tracking-[-1.44px] mt-[26px] max-md:max-w-full">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default FeatureCard;
