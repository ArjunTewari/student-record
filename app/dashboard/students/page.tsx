"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    age: 21,
    courses: ["Computer Science", "Mathematics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    age: 20,
    courses: ["Business Administration", "Economics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    age: 22,
    courses: ["Electrical Engineering", "Physics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Jessica Taylor",
    email: "j.taylor@example.com",
    age: 19,
    courses: ["Psychology", "Sociology"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "d.wilson@example.com",
    age: 23,
    courses: ["Medicine", "Biology"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Emily Brown",
    email: "e.brown@example.com",
    age: 20,
    courses: ["English Literature", "History"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "James Miller",
    email: "j.miller@example.com",
    age: 22,
    courses: ["Computer Engineering", "Mathematics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Olivia Davis",
    email: "o.davis@example.com",
    age: 21,
    courses: ["Fine Arts", "Design"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Available courses for selection
const availableCourses = [
  "Computer Science",
  "Mathematics",
  "Business Administration",
  "Economics",
  "Electrical Engineering",
  "Physics",
  "Psychology",
  "Sociology",
  "Medicine",
  "Biology",
  "English Literature",
  "History",
  "Computer Engineering",
  "Fine Arts",
  "Design",
]

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<any>(null)
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    age: "",
    courses: [] as string[],
    avatar: "/placeholder.svg?height=40&width=40",
  })
  const { toast } = useToast()

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const id = (students.length + 1).toString()
    setStudents([...students, { ...newStudent, id }])
    setNewStudent({
      name: "",
      email: "",
      age: "",
      courses: [],
      avatar: "/placeholder.svg?height=40&width=40",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Success",
      description: "Student added successfully",
    })
  }

  // Handle editing a student
  const handleEditStudent = () => {
    if (!currentStudent) return

    const updatedStudents = students.map((student) => (student.id === currentStudent.id ? currentStudent : student))
    setStudents(updatedStudents)
    setIsEditDialogOpen(false)
    toast({
      title: "Success",
      description: "Student updated successfully",
    })
  }

  // Handle deleting a student
  const handleDeleteStudent = (id: string) => {
    const updatedStudents = students.filter((student) => student.id !== id)
    setStudents(updatedStudents)
    toast({
      title: "Success",
      description: "Student deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the details of the new student. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={newStudent.age}
                  onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courses" className="text-right">
                  Courses
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewStudent({
                      ...newStudent,
                      courses: [...newStudent.courses, value],
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {newStudent.courses.length > 0 && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-start-2 col-span-3 flex flex-wrap gap-2">
                    {newStudent.courses.map((course) => (
                      <Badge key={course} variant="secondary" className="gap-1">
                        {course}
                        <button
                          onClick={() =>
                            setNewStudent({
                              ...newStudent,
                              courses: newStudent.courses.filter((c) => c !== course),
                            })
                          }
                          className="ml-1 rounded-full hover:bg-secondary"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.courses.map((course) => (
                          <Badge key={course} variant="outline">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/students/${student.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentStudent(student)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the student record.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Update the student's information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentStudent.name}
                  onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentStudent.email}
                  onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-age" className="text-right">
                  Age
                </Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={currentStudent.age}
                  onChange={(e) => setCurrentStudent({ ...currentStudent, age: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-courses" className="text-right">
                  Courses
                </Label>
                <Select
                  onValueChange={(value) =>
                    setCurrentStudent({
                      ...currentStudent,
                      courses: [...currentStudent.courses, value],
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {currentStudent.courses.length > 0 && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-start-2 col-span-3 flex flex-wrap gap-2">
                    {currentStudent.courses.map((course: string) => (
                      <Badge key={course} variant="secondary" className="gap-1">
                        {course}
                        <button
                          onClick={() =>
                            setCurrentStudent({
                              ...currentStudent,
                              courses: currentStudent.courses.filter((c: string) => c !== course),
                            })
                          }
                          className="ml-1 rounded-full hover:bg-secondary"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditStudent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

