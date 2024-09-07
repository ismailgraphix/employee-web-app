"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";

const AddDepartmentAction = () => {
  const [name, setName] = useState("");
  const [headId, setHeadId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDepartment = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/departments", { name, headId });
      toast.success("Department added successfully!");
      setIsOpen(false); // Close the modal on success
      window.location.reload(); // Refresh the page
      toast.success("Department added successfully!");
    } catch (error) {
      toast.error("Failed to add department");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
        <Button variant="default">Add Department</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Department Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="headId" className="text-right">
                Department Head ID
              </Label>
              <Input
                id="headId"
                value={headId}
                onChange={(e) => setHeadId(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddDepartment} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Department"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDepartmentAction;
