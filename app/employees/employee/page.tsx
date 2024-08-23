"use client";

import React, { useState } from 'react';
import TopNavBar from './_components/top-navbar';
import Tabs from './_components/tabs';
import AddEmployeeForm from './_components/addemployeeform';
import Sidebar from '@/components/sidebar';

const AddEmployeePage = () => {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 sm:p-10">
                <TopNavBar />
                <div className="mt-6">
                    <Tabs setActiveTab={setActiveTab} />
                    <AddEmployeeForm activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
};

export default AddEmployeePage;
