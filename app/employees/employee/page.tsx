"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';

const AddEmployeePage = () => {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 sm:p-10">
                
                <div className="mt-6">
                    {/* Pass both setActiveTab and activeTab to Tabs */}
                    
                </div>
            </div>
        </div>
    );
};

export default AddEmployeePage;
