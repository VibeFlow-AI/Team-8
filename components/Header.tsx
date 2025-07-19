"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // make header floating and full-width but with transparent bg
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent h-20">
      {/* centered white container with fixed height */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 lg:px-24 bg-white shadow-md rounded-xl flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 48 48">
              <title>Google Icon</title>
              <path fill="#4285F4" d="M24 9.5c3.1 0 5.7 1.2 7.7 3.1l5.7-5.7C33.7 3.8 29.2 2 24 2 14.8 2 6.8 7.5 3 15l7.4 5.8C12.4 15.1 17.5 9.5 24 9.5z" />
              <path fill="#34A853" d="M46.1 24.5c0-1.7-.1-3.3-.4-4.8H24v9h12.5c-.5 2.9-2.3 5.3-4.9 7l7.5 5.8c4.3-4 6.8-9.9 6.8-17z" />
              <path fill="#FBBC05" d="M10.4 28.5c-.8-2.4-1.2-5-1.2-7.7s.4-5.3 1.2-7.7l-7.4-5.8C1.2 13.1 0 18.5 0 24s1.2 10.9 3 15l7.4-5.8z" />
              <path fill="#EA4335" d="M24 46c5.2 0 9.6-1.7 12.8-4.6l-7.5-5.8c-2.1 1.4-4.8 2.3-5.8 2.3-4.5 0-8.3-3-9.6-7.1l-7.4 5.8C6.8 40.4 14.8 46 24 46z" />
            </svg>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 text-base font-normal text-[#344054]">
          <Link href="/" className="hover:text-[#172B4D] transition-colors">
            Home
          </Link>
          <Link href="/sessions" className="hover:text-[#172B4D] transition-colors">
            Sessions
          </Link>
          <Link href="/about" className="hover:text-[#172B4D] transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#344054]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white p-5 z-50 shadow-md">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-[#344054] hover:text-[#172B4D] transition-colors">
                Home
              </Link>
              <Link href="/sessions" className="text-[#344054] hover:text-[#172B4D] transition-colors">
                Sessions
              </Link>
              <Link href="/about" className="text-[#344054] hover:text-[#172B4D] transition-colors">
                About
              </Link>
            </nav>
          </div>
        )}

        {/* CTA Button */}
        <Link href="/signup">
          <button className="cursor-pointer bg-black text-white text-base font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
