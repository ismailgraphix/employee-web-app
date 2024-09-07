"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employees = {
  id: string
  status: "permanent" | "contract" | "internship" 
  name: string
  department: "human resource" | "registry" | "IT" 
  designation: "software engineer" | "HR" | "designer" | "sales" | "record" | "registry"
  type: "office" | "remote" 
 
}

export const columns: ColumnDef<Employees>[] = [
  
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
    accessorKey: "name",
    
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "id",
    header: "Employee Id",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
 
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              View employee details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit employee</DropdownMenuItem>
            <DropdownMenuItem>Delete employee</DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
