'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOutAction } from '@/app/lib/actions'
import JobCard from './JobCard'
import JobModal from './JobModal'

// Mock job data
const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", description: "We are looking for a skilled Frontend Developer to join our team. The ideal candidate should have experience with React, TypeScript, and modern CSS frameworks.", postedDate: "2023-05-15" },
  { id: 2, title: "Backend Engineer", company: "DataSystems", location: "New York, NY", description: "DataSystems is seeking a Backend Engineer to help build scalable and efficient server-side applications. Experience with Node.js, Express, and MongoDB is required.", postedDate: "2023-05-14" },
  { id: 3, title: "Full Stack Developer", company: "WebSolutions", location: "San Francisco, CA", description: "Join our team as a Full Stack Developer and work on exciting projects using a variety of technologies including React, Node.js, and PostgreSQL.", postedDate: "2023-05-13" },
  { id: 4, title: "UI/UX Designer", company: "DesignHub", location: "London, UK", description: "DesignHub is looking for a creative UI/UX Designer to help create intuitive and visually appealing user interfaces for web and mobile applications.", postedDate: "2023-05-12" },
  { id: 5, title: "DevOps Engineer", company: "CloudOps", location: "Berlin, Germany", description: "We're hiring a DevOps Engineer to help streamline our development and deployment processes. Experience with AWS, Docker, and Kubernetes is a plus.", postedDate: "2023-05-11" },
]

interface JobBoardProps {
  session: Session | null
}

export default function JobBoard({ session }: JobBoardProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null)

  const handleProfileClick = () => {
    setIsNavigating(true)
    router.push('/profile')
  }

  const openJobModal = (job: typeof jobs[0]) => {
    setSelectedJob(job)
  }

  const closeJobModal = () => {
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleProfileClick}
              className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none focus:underline"
              disabled={isNavigating}
            >
              {isNavigating ? 'Loading...' : 'Profile'}
            </button>
            <p className="text-sm text-gray-700">
              Logged in as {session?.user?.email}
            </p>
            <SignOut />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onViewDetails={() => openJobModal(job)} />
            ))}
          </div>
        </div>
      </main>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={closeJobModal} />
      )}
    </div>
  )
}

function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOutAction()
    } catch (error) {
      console.error('Sign out failed:', error)
      setIsSigningOut(false)
    }
  }

  return (
    <button 
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {isSigningOut ? 'Signing out...' : 'Sign out'}
    </button>
  )
}