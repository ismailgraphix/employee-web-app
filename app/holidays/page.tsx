"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";

const Holiday = () => {
    const [showModal, setShowModal] = useState(false);
    const [holidayName, setHolidayName] = useState("");
    const [holidayDate, setHolidayDate] = useState("");
    const [holidays, setHolidays] = useState([
        { date: "2023-01-01", day: "Tuesday", name: "New Year" },
        { date: "2023-01-07", day: "Saturday", name: "International Programmers' Day" },
        { date: "2023-02-04", day: "Saturday", name: "World Cancer Day" },
        { date: "2023-04-01", day: "Saturday", name: "April Fool Day" },
        { date: "2023-05-07", day: "Monday", name: "International Programmers' Day" },
        { date: "2024-05-22", day: "Tuesday", name: "International Day for Biological Diversity" },
        { date: "2024-06-05", day: "Monday", name: "International Day for Biological Diversity" },
        { date: "2024-08-07", day: "Monday", name: "International Friendship Day" },
        { date: "2024-09-15", day: "Friday", name: "International Day of Democracy" },
        { date: "2024-11-14", day: "Tuesday", name: "World Diabetes Day" },
        { date: "2024-12-25", day: "Monday", name: "Merry Christmas" },
    ]);

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    // Explicitly type the parameter as a string
    const isUpcoming = (holidayDate: string): boolean => {
        const holiday = new Date(holidayDate);
        return holiday >= currentDate;
    };

    const handleAddHoliday = () => {
        const newHoliday = {
            date: holidayDate,
            day: new Date(holidayDate).toLocaleDateString("en-US", { weekday: "long" }),
            name: holidayName,
        };
        setHolidays([...holidays, newHoliday]);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-4 sm:p-10">
                {/* Header */}
                <Header />

                {/* Holiday List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Search and Add New Holiday Button */}
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
                            Add New Holiday
                        </button>
                    </div>

                    {/* Holiday Table */}
                    <table className="min-w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Date</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Day</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Holiday Name</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {holidays.map((holiday, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {new Date(holiday.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{holiday.day}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{holiday.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {isUpcoming(holiday.date) ? (
                                            <span className="flex items-center">
                                                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                                Upcoming
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                                                Past
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Legend */}
                    <div className="flex justify-end mt-4">
                        <div className="flex items-center text-sm">
                            <div className="flex items-center mr-4">
                                <span className="block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                Upcoming
                            </div>
                            <div className="flex items-center">
                                <span className="block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                                Past Holidays
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-4">Add New Holiday</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Holiday Name"
                                    className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
                                    value={holidayName}
                                    onChange={(e) => setHolidayName(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    value={holidayDate}
                                    onChange={(e) => setHolidayDate(e.target.value)}
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
                                    onClick={handleAddHoliday}
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

export default Holiday;
