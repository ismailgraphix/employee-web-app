import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import ImageUpload from '@/components/ui/image-upload';

const EmployeeActions = ({ employee }: { employee: any }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [address, setAddress] = useState(employee.address || '');
  const [profilePicture, setProfilePicture] = useState<string[]>(employee.profilePicture ? [employee.profilePicture] : []);
  const [documentLinks, setDocumentLinks] = useState<string[]>(employee.documentLinks || []);
  const [dateOfBirth, setDateOfBirth] = useState(employee.dateOfBirth || '');
  const [gender, setGender] = useState(employee.gender || '');
  const [maritalStatus, setMaritalStatus] = useState(employee.maritalStatus || '');
  const [position, setPosition] = useState(employee.position || '');
  const [startDate, setStartDate] = useState(employee.startDate || '');
  const [departmentId, setDepartmentId] = useState<number | ''>(employee.departmentId || '');
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false); // New state

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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage
      await axios.delete(`/api/employees/${employee.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Employee deleted successfully!');
      setDeleteOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete employee');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);

    // Get user ID from token
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    try {
      await axios.put(`/api/employees/${employee.id}`, {
        id: employee.id,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        profilePicture,
        documentLinks,
        dateOfBirth,
        gender,
        maritalStatus,
        position,
        startDate,
        departmentId,
        addedById: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Employee updated successfully!');
      setEditOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update employee');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>Edit Employee</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>Delete Employee</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className={`sm:max-w-[600px] ${!isPictureUploaded ? 'pointer-events-none' : ''}`}>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Make changes to the employee details. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input Fields */}
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
              <Label htmlFor="profilePicture" className="text-right">Profile Picture</Label>
              <ImageUpload
                value={profilePicture}
                onChange={(url) => {
                  setProfilePicture(url ? [url] : []);
                  setIsPictureUploaded(true); // Set as uploaded
                }}
               
                onRemove={() => {}}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentLinks" className="text-right">Document Links</Label>
              <Input
                id="documentLinks"
                value={documentLinks.join(', ')}
                onChange={(e) => setDocumentLinks(e.target.value.split(', '))}
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
                onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                className="col-span-3"
              >
                <option value="">Select a department</option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleEdit}
              disabled={isLoading || !isPictureUploaded}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              onClick={() => setEditOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              type="button"
              onClick={() => setDeleteOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeActions;
