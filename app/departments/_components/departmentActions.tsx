import axios from 'axios';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from 'react-hot-toast';

// Separate component to manage dialog and dropdown logic
const DepartmentActions = ({ department }: { department: any }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [name, setName] = useState(department.name);
    const [head, setHead] = useState(department.head?.name ?? '');
    const [isLoading, setIsLoading] = useState(false);
  
    // Handle department deletion
    const handleDelete = async () => {
        setIsLoading(true);
        try {
          await axios.delete(`/api/departments/${department.id}`);
          toast.success('Department deleted successfully!');
          setDeleteOpen(false);
          
          window.location.reload();
        } catch (error) {
          toast.error('Failed to delete department');
        } finally {
          setIsLoading(false);
        }
      };
    
      // Handle department update
      const handleEdit = async () => {
        setIsLoading(true);
        try {
          await axios.put(`/api/departments/${department.id}`, {
            name,
            headId: department.headId,
          });
          toast.success('Login successful!');
          setEditOpen(false);
          
          window.location.reload();
        } catch (error) {
          toast.error('Failed to update department');
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
            <DropdownMenuItem onSelect={() => setEditOpen(true)}>
              Edit department
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>
              Delete department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit department</DialogTitle>
              <DialogDescription>
                Make changes to the department. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="head" className="text-right">
                  Department Head
                </Label>
                <Input
                  id="head"
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleEdit} disabled={isLoading}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  
        {/* Delete Dialog */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete department</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the department {department.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
              <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default DepartmentActions;
  
