import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 text-center dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Student Record Management System</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive solution for managing student profiles, courses, and grades
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard">Enter Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard/students">View Students</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

