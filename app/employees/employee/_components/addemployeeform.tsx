"use client";

import React from 'react';
import PersonalInfoForm from './personalinfoform';
import ProfessionalInfoForm from './professionalinfoform';
import DocumentsSection from './documentsSection';
import AccountAccessForm from './accessform';

interface AddEmployeeFormProps {
    activeTab: string;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ activeTab }) => {
    return (
        <div>
            {activeTab === 'personal' && (
                <div> {/* Personal Information Form */}
                    <h2>Personal Information</h2>
                    <PersonalInfoForm />
                    {/* Your form fields here */}
                </div>
            )}
            {activeTab === 'professional' && (
                <div> {/* Professional Information Form */}
                    <h2>Professional Information</h2>
                    <ProfessionalInfoForm/>
                    {/* Your form fields here */}
                </div>
            )}
            {activeTab === 'documents' && (
                <div> {/* Documents Form */}
                    <h2>Documents</h2>
                    <DocumentsSection/>
                    {/* Your form fields here */}
                </div>
            )}
            {activeTab === 'access' && (
                <div> {/* Account Access Form */}
                    <h2>Account Access</h2>
                    <AccountAccessForm/>
                    {/* Your form fields here */}
                </div>
            )}
        </div>
    );
};

export default AddEmployeeForm;
