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
                    
                    <PersonalInfoForm />
                    {/* Your form fields here */}
                </div>
            )}
            {activeTab === 'professional' && (
                <div> {/* Professional Information Form */}
                   
                    <ProfessionalInfoForm/>
                    {/* Your form fields here */}
                </div>
            )}
            {activeTab === 'documents' && (
                <div> {/* Documents Form */}
                    
                    <DocumentsSection/>
                    {/* Your form fields here */}
                </div>
            )}
            {activeTab === 'access' && (
                <div> {/* Account Access Form */}
                    
                    <AccountAccessForm/>
                    {/* Your form fields here */}
                </div>
            )}
        </div>
    );
};

export default AddEmployeeForm;
