"use client";

import React, { useState } from "react";

const FilterCard = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const toggleDepartment = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((item) => item !== department)
        : [...prev, department]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-4">Filter</h2>
      <input
        type="text"
        placeholder="Search Employee"
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
      />

      <h3 className="text-sm font-semibold mb-2">Department</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          "Design",
          "HR",
          "Sales",
          "Business Analyst",
          "Project Manager",
          "Java",
          "Python",
          "React JS",
          "Account",
          "Node JS",
        ].map((department) => (
          <label key={department} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDepartments.includes(department)}
              onChange={() => toggleDepartment(department)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-sm">{department}</span>
          </label>
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-2">Select Type</h3>
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Office"
            checked={selectedType === "Office"}
            onChange={() => setSelectedType("Office")}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-sm">Office</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Work from Home"
            checked={selectedType === "Work from Home"}
            onChange={() => setSelectedType("Work from Home")}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-sm">Work from Home</span>
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
