import React from 'react';

interface SessionCardProps {
    initials: string;
    initialsColor: string;
    name: string;
    location: string;
    subjects: string[];
    description: string;
    duration: string;
    language: string;
}

const SessionCard: React.FC<SessionCardProps> = ({
    initials,
    initialsColor,
    name,
    location,
    subjects,
    description,
    duration,
    language
}) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start mb-5">
                <div className="mr-4">
                    <div
                        className="w-10 h-10 flex items-center justify-center rounded-md"
                        style={{
                            backgroundColor: initialsColor === "#0099FF" ? "#0099FF" :
                                initialsColor === "#FF9500" ? "#FF9500" : "#D900FF"
                        }}
                    >
                        <span className="text-white font-medium" style={{
                            color: initialsColor === "#0099FF" ? "#FFFFFF" :
                                initialsColor === "#FF9500" ? "#FFFFFF" : "#FFFFFF"
                        }}>
                            {initials}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-black">{name}</h3>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {subjects.map((subject, idx) => (
                    <span
                        key={idx}
                        className="text-xs bg-gray-100 rounded-md px-3 py-1.5"
                    >
                        {subject}
                    </span>
                ))}
            </div>

            <p className="text-sm text-gray-800 mb-5 leading-relaxed">
                {description}
            </p>

            <div className="mb-6">
                <div className="flex">
                    <span className="text-xs font-medium w-28">Duration:</span>
                    <span className="text-xs text-gray-700">{duration}</span>
                </div>
                <div className="flex">
                    <span className="text-xs font-medium w-28">Preferred Language:</span>
                    <span className="text-xs text-gray-700">{language}</span>
                </div>
            </div>

            <div className="flex justify-between">
                <button className="bg-black text-white rounded-[4px] px-4 py-2 text-sm w-full">
                    Book a session
                </button>
                <button className="ml-4 border border-gray-300 p-2 rounded-[4px]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SessionCard;
