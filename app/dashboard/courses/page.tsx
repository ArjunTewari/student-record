"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Textarea } from "@/components/ui/textarea"
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
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialCourses = [
  {
    id: "1",
    name: "Introduction to Programming",
    description: "A beginner-friendly introduction to programming concepts using Python.",
    students: 32,
    department: "Computer Science",
    credits: 3,
  },
  {
    id: "2",
    name: "Data Structures",
    description: "Advanced programming concepts focusing on data structures and algorithms.",
    students: 28,
    department: "Computer Science",
    credits: 4,
  },
  {
    id: "3",
    name: "Principles of Management",
    description: "Introduction to management theories and business practices.",
    students: 45,
    department: "Business Administration",
    credits: 3,
  },
  {
    id: "4",
    name: "Circuit Analysis",
    description: "Fundamentals of electrical circuit analysis and design.",
    students: 24,
    department: "Electrical Engineering",
    credits: 4,
  },
  {
    id: "5",
    name: "Introduction to Psychology",
    description: "Survey of basic concepts in psychology and human behavior.",
    students: 60,
    department: "Psychology",
    credits: 3,
  },
  {
    id: "6",
    name: "Calculus I",
    description: "Introduction to differential and integral calculus.",
    students: 40,
    department: "Mathematics",
    credits: 4,
  },
  {
    id: "7",
    name: "Physics I",
    description: "Mechanics, thermodynamics, and wave motion.",
    students: 35,
    department: "Physics",
    credits: 4,
  },
  {
    id: "8",
    name: "Marketing Fundamentals",
    description: "Introduction to marketing principles and strategies.",
    students: 38,
    department: "Business Administration",
    credits: 3,
  },
]

// Available departments for selection
const departments = [
  "Computer Science",
  "Business Administration",
  "Electrical Engineering",
  "Psychology",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "History",
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<any>(null)
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    department: "",
    credits: "",
    students: 0,
  })
  const { toast } = useToast()

  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle adding a new course
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description || !newCourse.department || !newCourse.credits) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const id = (courses.length + 1).toString()
    setCourses([...courses, { ...newCourse, id }])
    setNewCourse({
      name: "",
      description: "",
      department: "",
      credits: "",
      students: 0,
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Success",
      description: "Course added successfully",
    })
  }

  // Handle editing a course
  const handleEditCourse = () => {
    if (!currentCourse) return

    const updatedCourses = courses.map((course) => (course.id === currentCourse.id ? currentCourse : course))
    setCourses(updatedCourses)
    setIsEditDialogOpen(false)
    toast({
      title: "Success",
      description: "Course updated successfully",
    })
  }

  // Handle deleting a course
  const handleDeleteCourse = (id: string) => {
    const courseToDelete = courses.find((course) => course.id === id)

    if (courseToDelete && courseToDelete.students > 0) {
      toast({
        title: "Error",
        description: "Cannot delete a course with enrolled students",
        variant: "destructive",
      })
      return
    }

    const updatedCourses = courses.filter((course) => course.id !== id)
    setCourses(updatedCourses)
    toast({
      title: "Success",
      description: "Course deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Enter the details of the new course. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <select
                  id="department"
                  value={newCourse.department}
                  onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="credits" className="text-right">
                  Credits
                </Label>
                <Input
                  id="credits"
                  type="number"
                  value={newCourse.credits}
                  onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
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
                <TableHead>Department</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No courses found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{course.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.department}</Badge>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentCourse(course)
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
                                  This action cannot be undone. This will permanently delete the course.
                                  {course.students > 0 && (
                                    <p className="mt-2 text-red-500">
                                      Warning: This course has {course.students} enrolled students. You cannot delete a
                                      course with enrolled students.
                                    </p>
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCourse(course.id)}
                                  disabled={course.students > 0}
                                >
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

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentCourse && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentCourse.name}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Department
                </Label>
                <select
                  id="edit-department"
                  value={currentCourse.department}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, department: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-credits" className="text-right">
                  Credits
                </Label>
                <Input
                  id="edit-credits"
                  type="number"
                  value={currentCourse.credits}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, credits: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={currentCourse.description}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

