"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Advocate } from "@/types/advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
      .then((response) => {
        response.json()
            .then((jsonResponse) => {
              setAdvocates(jsonResponse.data);
              setFilteredAdvocates(jsonResponse.data);
            })
      })
      .catch((err) => {
        setError(err.message || "Failed to load advocates");
      })
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    console.log("filtering advocates...");
    const searchLower = value.toLowerCase();
    const searchNumber = Number(value);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
        (!isNaN(searchNumber) && advocate.yearsOfExperience >= searchNumber)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const formatPhoneNumber = (phoneNumber: number) => {
    if (!phoneNumber) return '';

    const phoneStr = phoneNumber.toString();

    if (phoneStr.length === 10) {
      return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    }

    if (phoneStr.length === 11 && phoneStr.startsWith('1')) {
      return `+1 (${phoneStr.slice(1, 4)}) ${phoneStr.slice(4, 7)}-${phoneStr.slice(7)}`;
    }
  }

  return (
    <main className="container mx-auto px-6 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Solace Advocates</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          Error: {error}
        </div>
      )}

      <div className="p-6 mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Search
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Searching for: <span className="font-semibold text-gray-900">{searchTerm || "all"}</span>
        </p>
        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            onChange={onChange}
            value={searchTerm}
            placeholder="Search by name, city, degree, specialty, or years..."
          />
          <button
            onClick={onClick}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition"
          >
            Reset Search
          </button>
        </div>
      </div>

      <div>
        <div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Degree</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Specialties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Years of Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone Number</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdvocates.map((advocate) => {
                return (
                  <tr key={`row-${advocate.id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{advocate.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{advocate.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{advocate.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{advocate.degree}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {advocate.specialties.map((s) => (
                          <span key={`specialty-${s}`} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{advocate.yearsOfExperience}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{formatPhoneNumber(advocate.phoneNumber)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
