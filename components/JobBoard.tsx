'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Session } from 'next-auth'
import { signOutAction } from '@/app/lib/actions'


// Mock job data
const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote" },
  { id: 2, title: "Backend Engineer", company: "DataSystems", location: "New York, NY" },
  { id: 3, title: "Full Stack Developer", company: "WebSolutions", location: "San Francisco, CA" },
  { id: 4, title: "UI/UX Designer", company: "DesignHub", location: "London, UK" },
  { id: 5, title: "DevOps Engineer", company: "CloudOps", location: "Berlin, Germany" },
]

interface JobBoardProps {
  session: Session | null
}

export default function JobBoard({ session }: JobBoardProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleProfileClick = () => {
    setIsNavigating(true)
    router.push('/profile')
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
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function JobCard({ job }: { job: { id: number; title: string; company: string; location: string } }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
      <p className="mt-2 text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-600">{job.location}</p>
      <button 
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Apply
      </button>
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
