'use client';

import React from 'react';
import ImageUpload from '@/components/ui/image-upload';

interface FileUploadProps {
  label: string;
}

const DocumentsSection = () => {
  return (
    <div className="p-6 border rounded-lg bg-white">
      <div className="grid grid-cols-2 gap-6">
        <FileUpload label="Upload Appointment Letter" />
        <FileUpload label="Upload Salary Slips" />
        <FileUpload label="Upload Relieving Letter" />
        <FileUpload label="Upload Experience Letter" />
      </div>
      <div className="mt-9 flex justify-end">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>
      </div>
    </div>
  );
};

const FileUpload: React.FC<FileUploadProps> = ({ label }) => {
  const [fileUrls, setFileUrls] = React.useState<string[]>([]);

  const handleFileUpload = (url: string) => {
    setFileUrls([...fileUrls, url]);
  };

  const handleFileRemove = (url: string) => {
    setFileUrls(fileUrls.filter(file => file !== url));
  };

  return (
    <div className="border-2 border-dashed border-blue-500 rounded-lg p-6 text-center">
      <ImageUpload
        value={fileUrls}
        onChange={handleFileUpload}
        onRemove={handleFileRemove}
      />
      <p className="mb-2 text-gray-700">{label}</p>
      <p className="text-blue-500 cursor-pointer">Drag & Drop or <span className="underline">choose file</span> to upload</p>
      <p className="text-sm text-gray-500 mt-2">Supported formats: .jpeg, .pdf</p>
    </div>
  );
};

export default DocumentsSection;
