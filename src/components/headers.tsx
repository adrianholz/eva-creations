'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';


export function LoggedInHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full">
      <div className="mx-auto max-w-7xl flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav className="hidden xl:flex space-x-4">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/profile" className="hover:underline">Profile</Link>
          <Link href="/api/auth/logout" className="hover:underline">Logout</Link>
        </nav>
        <button
          className="xl:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity xl:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-white font-semibold">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <Link href="/dashboard" className="block px-6 py-3 text-white hover:bg-gray-700 transition-colors">Dashboard</Link>
              <Link href="/profile" className="block px-6 py-3 text-white hover:bg-gray-700 transition-colors">Profile</Link>
              <Link href="/api/auth/logout" className="block px-6 py-3 text-white hover:bg-gray-700 transition-colors">Logout</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}