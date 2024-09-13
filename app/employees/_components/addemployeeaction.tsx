'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ui/image-upload'; // Adjust the import path if needed

const AddEmployeeModal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [documentLinks, setDocumentLinks] = useState<string[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [departmentId, setDepartmentId] = useState<number | ''>('');
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleAddEmployee = async () => {
    setIsLoading(true);

    // Get user ID from token
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    try {
      await axios.post('/api/employees', {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        
        documentLinks,
        dateOfBirth,
        gender,
        maritalStatus,
        position,
        startDate,
        departmentId,
        addedById: userId
      });
      toast.success('Employee added successfully!');
      setIsOpen(false); // Close the modal on success
      window.location.reload();  // Refresh the page
    } catch (error) {
      toast.error('Failed to add employee');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Employee</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentLinks" className="text-right">Document Links (comma-separated)</Label>
              <Input
                id="documentLinks"
                value={documentLinks.join(',')}
                onChange={(e) => setDocumentLinks(e.target.value.split(',').map(doc => doc.trim()))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfBirth" className="text-right">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">Gender</Label>
              <Input
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maritalStatus" className="text-right">Marital Status</Label>
              <Input
                id="maritalStatus"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">Position</Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <select
                id="department"
                value={departmentId}
                onChange={(e) => setDepartmentId(Number(e.target.value))}
                className="col-span-3 border p-3 rounded-md"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddEmployee} disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Employee'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default AddEmployeeModal;
