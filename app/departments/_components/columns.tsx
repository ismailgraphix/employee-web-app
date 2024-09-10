"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { ArrowUpDown } from "lucide-react"
import DepartmentActions from "./departmentActions"

export type Departments = {
  id: string
  name: string
  department: string
  head: {
    name: string; // Assuming the head has a name property
    employees: string;
  };
  
 
}

export const columns: ColumnDef<Departments>[] = [
  
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Department Id",
  },
  {
    accessorKey: "name",
    
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  {
    accessorKey: "head.name",
    header: "Department Head",
    cell: ({ row }) => <div>{row.original.head?.name ?? 'N/A'}</div>,
  },
  {
    accessorKey: "employees",
    header: "Employees",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;

      return <DepartmentActions department={department} />;
    },
  },
]
