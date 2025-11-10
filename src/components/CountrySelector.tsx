'use client';

import React, { useEffect } from 'react';
import { useCountryStore, Country } from '../store/countryStore';
import Image from 'next/image';

const CountrySelector: React.FC = () => {
  const {
    filteredCountries,
    searchTerm,
    selectedCountry, // <-- Get the selected country
    fetchCountries,
    setSearchTerm,
    selectCountry, // <-- Get the action
  } = useCountryStore();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Select Your Country</h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or phone code..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
      </div>
      <div className="mt-4 max-h-80 overflow-y-auto">
        {filteredCountries.length > 0 ? (
          <ul>
            {filteredCountries.map((country: Country) => {
              const isSelected = selectedCountry?.cca2 === country.cca2;
              return (
                <li
                  key={country.cca2}
                  onClick={() => selectCountry(country)} // <-- Handle click event
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-100 hover:bg-blue-200' // <-- Highlight if selected
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Image
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    width={32}
                    height={24}
                    // Added object-contain to ensure flag aspect ratio is maintained
                    className="mr-4 shadow-sm object-contain"
                  />
                  <span className="grow text-gray-700 font-medium">{country.name.common}</span>
                  <span className="text-gray-500 text-sm">
                    {country.idd.root}{country.idd.suffixes?.[0]}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-6">No countries found.</p>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;