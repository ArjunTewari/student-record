import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentGrades = [
  {
    id: "1",
    student: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Advanced Programming",
    grade: "A",
    date: "2023-05-15",
  },
  {
    id: "2",
    student: {
      name: "Samantha Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Marketing Fundamentals",
    grade: "B+",
    date: "2023-05-14",
  },
  {
    id: "3",
    student: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Circuit Design",
    grade: "A-",
    date: "2023-05-13",
  },
  {
    id: "4",
    student: {
      name: "Jessica Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    course: "Cognitive Psychology",
    grade: "B",
    date: "2023-05-12",
  },
]

export function RecentGradesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentGrades.map((grade) => (
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
            <TableCell className="text-right text-sm text-muted-foreground">
              {new Date(grade.date).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

