"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import TopNavBar from "./_components/top-navbar";
import { Separator } from "@radix-ui/react-select";

const Department = () => {
    const [showModal, setShowModal] = useState(false);
    const [departmentName, setDepartmentName] = useState("");
    const [departmentHead, setDepartmentHead] = useState("");
    const [departments, setDepartments] = useState([
        { name: "Human Resources", head: "Jane Doe", employees: 10 },
        { name: "IT", head: "John Smith", employees: 25 },
        { name: "Finance", head: "Mary Johnson", employees: 8 },
        { name: "Marketing", head: "Michael Brown", employees: 12 },
    ]);

    const handleAddDepartment = () => {
        const newDepartment = {
            name: departmentName,
            head: departmentHead,
            employees: 0,  // Initialize with 0 employees
        };
        setDepartments([...departments, newDepartment]);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-4 sm:p-10">
                {/* Header */}
                <TopNavBar/>

   
                {/* Department List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                <Separator/>
                    {/* Search and Add New Department Button */}

                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <button
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
                            onClick={() => setShowModal(true)}
                        >
                            <AiOutlinePlus className="mr-2" />
                            Add New Department
                        </button>
                    </div>

                    {/* Department Table */}
                    <table className="min-w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Department Name</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Department Head</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Number of Employees</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {departments.map((department, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{department.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{department.head}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{department.employees}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-4">Add New Department</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Department Name"
                                    className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Department Head"
                                    className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    value={departmentHead}
                                    onChange={(e) => setDepartmentHead(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                                    onClick={handleAddDepartment}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Department;
