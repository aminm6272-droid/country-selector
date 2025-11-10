'use client'; // <-- This must be a client component to use hooks

import Image from 'next/image';
import CountrySelector from '../components/CountrySelector';
import { useCountryStore } from '../store/countryStore'; // <-- Import the store

export default function Home() {
  // Get the selectedCountry from the Zustand store
  const { selectedCountry } = useCountryStore();

  // Dynamically set the dialog text
  const dialogText = selectedCountry
    ? 'good Booooy'
    : 'Choose your country or I will ignore you... mmmm.';

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Country Selector Component */}
        <div className="w-full max-w-md order-1">
          <CountrySelector />
        </div>

        {/* Cat Teacher and Dialog - Position updated to the right */}
        <div className="relative w-48 md:w-64 order-2 mt-8 md:mt-30">
          <div className="relative">
            {/* Dialog Bubble - Position adjusted for the right side */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white p-4 rounded-lg shadow-xl">
              <p className="text-center text-gray-700">{dialogText}</p> {/* <-- Use dynamic text */}
              {/* Bubble Tail - Repositioned */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-10 border-t-white"></div>
            </div>
          </div>
          {/* Cat Image */}
          <Image
            src="/country-selector/cat-teacher.png"
            alt="Cat teacher pointing"
            width={256}
            height={256}
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}