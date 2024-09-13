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
  const [viewOpen, setViewOpen] = useState(false); // View Employee Dialog
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
          <DropdownMenuItem onSelect={() => setViewOpen(true)}>View Employee</DropdownMenuItem> {/* View Action */}
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>Edit Employee</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>Delete Employee</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Employee Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View Employee</DialogTitle>
            <DialogDescription>View the details of this employee.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>First Name:</Label>
              <div className="col-span-3">{firstName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Last Name:</Label>
              <div className="col-span-3">{lastName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Email:</Label>
              <div className="col-span-3">{email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Phone Number:</Label>
              <div className="col-span-3">{phoneNumber}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Address:</Label>
              <div className="col-span-3">{address}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Date of Birth:</Label>
              <div className="col-span-3">{dateOfBirth}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Gender:</Label>
              <div className="col-span-3">{gender}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Marital Status:</Label>
              <div className="col-span-3">{maritalStatus}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Position:</Label>
              <div className="col-span-3">{position}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Start Date:</Label>
              <div className="col-span-3">{startDate}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Department:</Label>
              <div className="col-span-3">
                {departments.find((dep) => dep.id === departmentId)?.name || 'N/A'}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setViewOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit and Delete Dialogs remain unchanged */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        {/* ...Edit dialog code... */}
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        {/* ...Delete confirmation code... */}
      </Dialog>
    </div>
  );
};

export default EmployeeActions;
