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
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.1667 15.4167C33.1667 7.75 26.25 1.08333 17 1.08333C7.75 1.08333 0.833328 7.75 0.833328 15.4167C0.833328 23.0833 7.75 29.75 17 29.75C26.25 29.75 33.1667 23.0833 33.1667 15.4167Z" fill="#667085" />
              <path d="M22.1917 23.6167L11.8083 10.3833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.8083 23.6167L22.1917 10.3833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <button className="bg-black text-white text-base font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
