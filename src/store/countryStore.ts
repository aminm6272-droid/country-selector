import { create } from 'zustand';
import axios from 'axios';

// The Country interface remains the same
export interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
}

// Update the state to include the selected country and a selection action
interface CountryState {
  countries: Country[];
  filteredCountries: Country[];
  searchTerm: string;
  selectedCountry: Country | null; // <-- Add selectedCountry state
  fetchCountries: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  selectCountry: (country: Country) => void; // <-- Add action to select a country
}

export const useCountryStore = create<CountryState>((set, get) => ({
  countries: [],
  filteredCountries: [],
  searchTerm: '',
  selectedCountry: null, // <-- Initialize as null

  fetchCountries: async () => {
    try {
      const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd');
      const sortedCountries = response.data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      set({ countries: sortedCountries, filteredCountries: sortedCountries });
    } catch (error) {
      console.error("Failed to fetch countries", error);
    }
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    const { countries } = get();
    const filtered = countries.filter(country => {
      const phoneCode = `${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
      return (
        country.name.common.toLowerCase().includes(term.toLowerCase()) ||
        phoneCode.includes(term)
      );
    });
    set({ filteredCountries: filtered, selectedCountry: null }); // <-- Reset selection on new search
  },

  // Action to set the selected country
  selectCountry: (country) => {
    set({ selectedCountry: country });
  },
}));