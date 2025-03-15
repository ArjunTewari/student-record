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
import { Edit, MoreHorizontal, Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialGrades = [
  {
    id: "1",
    student: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Introduction to Programming",
    grade: "A",
    semester: "Fall 2023",
    submittedBy: "Dr. Smith",
    submittedDate: "2023-12-15",
  },
  {
    id: "2",
    student: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Calculus I",
    grade: "A-",
    semester: "Fall 2023",
    submittedBy: "Dr. Johnson",
    submittedDate: "2023-12-14",
  },
  {
    id: "3",
    student: {
      id: "2",
      name: "Samantha Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Principles of Management",
    grade: "B+",
    semester: "Fall 2023",
    submittedBy: "Prof. Williams",
    submittedDate: "2023-12-16",
  },
  {
    id: "4",
    student: {
      id: "2",
      name: "Samantha Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Marketing Fundamentals",
    grade: "A",
    semester: "Fall 2023",
    submittedBy: "Dr. Davis",
    submittedDate: "2023-12-15",
  },
  {
    id: "5",
    student: {
      id: "3",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Circuit Analysis",
    grade: "A",
    semester: "Fall 2023",
    submittedBy: "Prof. Wilson",
    submittedDate: "2023-12-14",
  },
  {
    id: "6",
    student: {
      id: "3",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Physics I",
    grade: "B+",
    semester: "Fall 2023",
    submittedBy: "Dr. Brown",
    submittedDate: "2023-12-13",
  },
  {
    id: "7",
    student: {
      id: "4",
      name: "Jessica Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Introduction to Psychology",
    grade: "A-",
    semester: "Fall 2023",
    submittedBy: "Dr. Miller",
    submittedDate: "2023-12-16",
  },
  {
    id: "8",
    student: {
      id: "4",
      name: "Jessica Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Introduction to Sociology",
    grade: "B",
    semester: "Fall 2023",
    submittedBy: "Prof. Garcia",
    submittedDate: "2023-12-15",
  },
]

// Mock students for selection
const students = [
  { id: "1", name: "Alex Johnson" },
  { id: "2", name: "Samantha Lee" },
  { id: "3", name: "Michael Chen" },
  { id: "4", name: "Jessica Taylor" },
  { id: "5", name: "David Wilson" },
  { id: "6", name: "Emily Brown" },
  { id: "7", name: "James Miller" },
  { id: "8", name: "Olivia Davis" },
]

// Mock courses for selection
const courses = [
  "Introduction to Programming",
  "Data Structures",
  "Principles of Management",
  "Marketing Fundamentals",
  "Circuit Analysis",
  "Physics I",
  "Introduction to Psychology",
  "Introduction to Sociology",
  "Calculus I",
  "Calculus II",
]

// Available grades for selection
const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"]

// Available semesters for selection
const semesters = ["Fall 2023", "Spring 2024", "Summer 2024", "Fall 2024"]

export default function GradesPage() {
  const [grades, setGrades] = useState(initialGrades)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentGrade, setCurrentGrade] = useState<any>(null)
  const [newGrade, setNewGrade] = useState({
    student: "",
    course: "",
    grade: "",
    semester: "",
  })
  const { toast } = useToast()

  // Filter grades based on search term
  const filteredGrades = grades.filter(
    (grade) =>
      grade.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle adding a new grade
  const handleAddGrade = () => {
    if (!newGrade.student || !newGrade.course || !newGrade.grade || !newGrade.semester) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const id = (grades.length + 1).toString()
    const selectedStudent = students.find((s) => s.id === newGrade.student)

    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Invalid student selected",
        variant: "destructive",
      })
      return
    }

    const newGradeEntry = {
      id,
      student: {
        id: selectedStudent.id,
        name: selectedStudent.name,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      course: newGrade.course,
      grade: newGrade.grade,
      semester: newGrade.semester,
      submittedBy: "Current User",
      submittedDate: new Date().toISOString().split("T")[0],
    }

    setGrades([...grades, newGradeEntry])
    setNewGrade({
      student: "",
      course: "",
      grade: "",
      semester: "",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Success",
      description: "Grade added successfully",
    })
  }

  // Handle editing a grade
  const handleEditGrade = () => {
    if (!currentGrade) return

    const updatedGrades = grades.map((grade) => (grade.id === currentGrade.id ? currentGrade : grade))
    setGrades(updatedGrades)
    setIsEditDialogOpen(false)
    toast({
      title: "Success",
      description: "Grade updated successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Grades</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Grade</DialogTitle>
              <DialogDescription>Enter the grade details. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Student
                </Label>
                <Select
                  value={newGrade.student}
                  onValueChange={(value) => setNewGrade({ ...newGrade, student: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select value={newGrade.course} onValueChange={(value) => setNewGrade({ ...newGrade, course: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Grade
                </Label>
                <Select value={newGrade.grade} onValueChange={(value) => setNewGrade({ ...newGrade, grade: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="semester" className="text-right">
                  Semester
                </Label>
                <Select
                  value={newGrade.semester}
                  onValueChange={(value) => setNewGrade({ ...newGrade, semester: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGrade}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by student or course..."
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
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No grades found
                  </TableCell>
                </TableRow>
              ) : (
                filteredGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={grade.student.avatar} alt={grade.student.name} />
                          <AvatarFallback>{grade.student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{grade.student.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{grade.course}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {grade.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{grade.semester}</TableCell>
                    <TableCell>{grade.submittedBy}</TableCell>
                    <TableCell>{grade.submittedDate}</TableCell>
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
                              setCurrentGrade(grade)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
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

      {/* Edit Grade Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Grade</DialogTitle>
            <DialogDescription>Update the grade information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentGrade && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Student</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentGrade.student.avatar} alt={currentGrade.student.name} />
                    <AvatarFallback>{currentGrade.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{currentGrade.student.name}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Course</Label>
                <div className="col-span-3">{currentGrade.course}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-grade" className="text-right">
                  Grade
                </Label>
                <Select
                  value={currentGrade.grade}
                  onValueChange={(value) => setCurrentGrade({ ...currentGrade, grade: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-semester" className="text-right">
                  Semester
                </Label>
                <Select
                  value={currentGrade.semester}
                  onValueChange={(value) => setCurrentGrade({ ...currentGrade, semester: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGrade}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

