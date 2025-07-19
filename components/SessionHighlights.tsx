import React from 'react';
import SessionCard from './SessionCard';

const SessionHighlights = () => {
  const sessions = [
    {
      initials: "RL",
      initialsColor: "#0099FF",
      name: "Rahul Lavan",
      location: "Colombo",
      subjects: ["Science", "Physics", "Biology"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "30 mins - 1 hour",
      language: "English, Tamil"
    },
    {
      initials: "CR",
      initialsColor: "#FF9500",
      name: "Chathum Rahal",
      location: "Galle",
      subjects: ["Mathematics", "History", "English"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "1 hour",
      language: "English"
    },
    {
      initials: "MI",
      initialsColor: "#D900FF",
      name: "Malsha Fernando",
      location: "Colombo",
      subjects: ["Chemistry", "Art", "Commerce"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "1 hour",
      language: "Sinhala"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-yellow-100 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-center mb-4">
          Session Highlights – Trending Now
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl text-center max-w-4xl mx-auto mb-16">
          Join the sessions students are raving about. These expert-led, high-impact
          sessions are designed to help you unlock your full potential whether you're
          polishing your resume, mapping out your career path, or getting ready to ace
          technical interviews.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="cursor-pointer border border-gray-400 rounded px-6 py-2 text-gray-800 font-medium hover:bg-gray-50 transition-colors">
            Load More Sessions
          </button>
        </div>
      </div>
    </section>
  );
};

export default SessionHighlights;
