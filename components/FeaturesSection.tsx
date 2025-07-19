import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Personalized Learning",
      description: "We tailor the mentorship experience to fit each student's unique goals, learning style, and pace making every session impactful.",
      imageSrc: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Students getting personalized attention"
    },
    {
      title: "Real Mentors, Real Guidance",
      description: "Connect with experienced mentors who provide practical guidance and support throughout your journey.",
      imageSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Mentors working with students"
    },
    {
      title: "Growth & Career Readiness",
      description: "Develop the skills and knowledge needed for career success with targeted guidance.",
      imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Student career development"
    },
    {
      title: "Insights-Driven Support",
      description: "Get data-driven insights to enhance your learning experience and track progress.",
      imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Data insights visualization"
    }
  ];

  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background gradient - blue to yellow like in the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-50 to-yellow-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-[56px] font-medium tracking-tight text-gray-900 mb-8">
            What's in it for Students?
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
            EduVibe is a student-mentor platform designed to personalize learning
            journeys. It connects students with mentors who offer guidance,
            support, and practical industry insights.
          </p>
        </div>

        <div className="flex gap-4 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative h-[500px] rounded-2xl overflow-hidden 
                         flex-1 transition-all duration-500 ease-in-out
                         group hover:flex-[2.5] hover:z-20
                         peer/card{index}"
            >
              <img
                src={feature.imageSrc}
                alt={feature.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

              {/* White Glow Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-100 opacity-0 group-hover:opacity-100 
                             transition-all duration-500 transform translate-y-4 
                             group-hover:translate-y-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
