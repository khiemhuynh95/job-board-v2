'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { updateProfile } from '@/app/lib/actions'
import PdfViewer from './PDFViewer'

type ProfileContentProps = {
  user: any
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const [name, setName] = useState(user?.name || '')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    try {
      const result = await updateProfile(formData)
      if (result.success) {
        console.log('Profile updated successfully')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <Link href="/job-board" className="text-blue-500 hover:text-blue-600">
            Back to Job Board
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Profile</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          {user?.resumeurl && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Resume</h3>
              <div className="border border-gray-300 rounded-md overflow-hidden" style={{ height: 'calc(100vh - 400px)', maxHeight: '800px' }}>
                <PdfViewer url={user.resumeurl} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}