'use client';

import React, { useState } from 'react';
import ImageUpload from '@/components/ui/image-upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<string[]>([]);
  const router = useRouter();

  const handleDocumentUpload = (url: string) => {
    setDocuments([...documents, url]);
  };

  const handleDocumentRemove = (url: string) => {
    setDocuments(documents.filter(doc => doc !== url));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/employees/documents', { documents });
      console.log('Documents uploaded successfully');
      router.push('/success'); // Redirect after completion
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  return (
    <div className='p-6 border rounded-lg bg-white'>
      <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
      <ImageUpload
        value={documents}
        onChange={handleDocumentUpload}
        onRemove={handleDocumentRemove}
      />
      <div className="flex justify-end mt-6">
        <button type="button" className="bg-gray-300 py-2 px-4 rounded-md mr-4">Cancel</button>
        <button type="button" className="bg-indigo-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Finish</button>
      </div>
    </div>
  );
};

export default DocumentsSection;
