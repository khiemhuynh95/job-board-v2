import React from 'react'

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  postedDate: string
}

interface JobModalProps {
  job: Job
  onClose: () => void
}

export default function JobModal({ job, onClose }: JobModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close modal"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <p className="text-gray-600 mb-2">{job.company}</p>
        <p className="text-gray-600 mb-2">{job.location}</p>
        <p className="text-gray-500 mb-4">Posted on: {new Date(job.postedDate).toLocaleDateString()}</p>
        <p className="text-gray-800 mb-6">{job.description}</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              console.log(`Applied to ${job.title}`);
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}