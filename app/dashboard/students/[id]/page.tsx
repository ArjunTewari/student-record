"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, Mail, Phone, User } from "lucide-react"
import Link from "next/link"

// Mock data for a single student
const mockStudentData = {
  "1": {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    age: 21,
    dateOfBirth: "2002-05-15",
    address: "123 University Ave, College Town, CA 94321",
    courses: ["Computer Science", "Mathematics"],
    avatar: "/placeholder.svg?height=128&width=128",
    grades: [
      { course: "Introduction to Programming", grade: "A", semester: "Fall 2022" },
      { course: "Data Structures", grade: "A-", semester: "Spring 2023" },
      { course: "Algorithms", grade: "B+", semester: "Fall 2023" },
      { course: "Calculus I", grade: "A", semester: "Fall 2022" },
      { course: "Calculus II", grade: "B+", semester: "Spring 2023" },
    ],
  },
  "2": {
    id: "2",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    phone: "+1 (555) 987-6543",
    age: 20,
    dateOfBirth: "2003-08-22",
    address: "456 College Blvd, University City, NY 10001",
    courses: ["Business Administration", "Economics"],
    avatar: "/placeholder.svg?height=128&width=128",
    grades: [
      { course: "Principles of Management", grade: "A-", semester: "Fall 2022" },
      { course: "Marketing Fundamentals", grade: "B+", semester: "Spring 2023" },
      { course: "Financial Accounting", grade: "A", semester: "Fall 2023" },
      { course: "Microeconomics", grade: "B", semester: "Fall 2022" },
      { course: "Macroeconomics", grade: "A-", semester: "Spring 2023" },
    ],
  },
  "3": {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 456-7890",
    age: 22,
    dateOfBirth: "2001-03-10",
    address: "789 Engineering Dr, Tech City, TX 75001",
    courses: ["Electrical Engineering", "Physics"],
    avatar: "/placeholder.svg?height=128&width=128",
    grades: [
      { course: "Circuit Analysis", grade: "A", semester: "Fall 2022" },
      { course: "Digital Logic Design", grade: "A-", semester: "Spring 2023" },
      { course: "Signals and Systems", grade: "B+", semester: "Fall 2023" },
      { course: "Physics I", grade: "A", semester: "Fall 2022" },
      { course: "Physics II", grade: "A-", semester: "Spring 2023" },
    ],
  },
  "4": {
    id: "4",
    name: "Jessica Taylor",
    email: "j.taylor@example.com",
    phone: "+1 (555) 789-0123",
    age: 19,
    dateOfBirth: "2004-11-05",
    address: "321 Psychology Ln, Mind City, WA 98001",
    courses: ["Psychology", "Sociology"],
    avatar: "/placeholder.svg?height=128&width=128",
    grades: [
      { course: "Introduction to Psychology", grade: "A", semester: "Fall 2022" },
      { course: "Developmental Psychology", grade: "B+", semester: "Spring 2023" },
      { course: "Abnormal Psychology", grade: "A-", semester: "Fall 2023" },
      { course: "Introduction to Sociology", grade: "A-", semester: "Fall 2022" },
      { course: "Social Problems", grade: "B", semester: "Spring 2023" },
    ],
  },
}

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id as string
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch student data
    setTimeout(() => {
      const studentData = mockStudentData[studentId as keyof typeof mockStudentData]
      if (studentData) {
        setStudent(studentData)
      }
      setLoading(false)
    }, 500)
  }, [studentId])

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading student data...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p className="text-muted-foreground">The student you're looking for doesn't exist.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/students">Back to Students</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/students">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Student Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{student.name}</CardTitle>
              <CardDescription>Student ID: {student.id}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{student.age} years old</span>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Enrolled Courses</h3>
                <div className="flex flex-wrap gap-2">
                  {student.courses.map((course: string) => (
                    <Badge key={course} variant="secondary">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href={`/dashboard/students/${student.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p>{student.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{student.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p>{student.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date of Birth</h3>
                    <p>{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
                    <p>{student.age} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p>{student.address}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="grades">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Semester</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.grades.map((grade: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{grade.course}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {grade.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>{grade.semester}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

