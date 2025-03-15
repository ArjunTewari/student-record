import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"

const recentStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    age: 21,
    course: "Computer Science",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    age: 20,
    course: "Business Administration",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    age: 22,
    course: "Electrical Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Jessica Taylor",
    email: "j.taylor@example.com",
    age: 19,
    course: "Psychology",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentStudentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Course</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentStudents.map((student) => (
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
              <Badge variant="outline">{student.course}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button asChild size="icon" variant="ghost">
                <Link href={`/dashboard/students/${student.id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

