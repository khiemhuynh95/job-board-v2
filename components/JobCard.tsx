import React from 'react'

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  postedDate: string
}

interface JobCardProps {
  job: Job
  onViewDetails: () => void
}

export default function JobCard({ job, onViewDetails }: JobCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
      <p className="mt-2 text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-sm text-gray-500 mt-2">Posted on: {new Date(job.postedDate).toLocaleDateString()}</p>
      <button 
        onClick={onViewDetails}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        View Details
      </button>
    </div>
  )
}