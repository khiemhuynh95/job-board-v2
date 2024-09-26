'use client'

import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import Link from 'next/link'
import { updateProfile } from '@/app/lib/actions'
import PdfViewer from './PDFViewer'

type ProfileContentProps = {
  user: any
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const [name, setName] = useState(user?.name || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
  const [education, setEducation] = useState(user?.education || '')
  const [gpa, setGpa] = useState(user?.gpa || '')
  const [skills, setSkills] = useState<string[]>(user?.skills || [])
  const [newSkill, setNewSkill] = useState('')
  const [experience, setExperience] = useState(user?.experience || '')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('skills', JSON.stringify(skills))
    try {
      const result = await updateProfile(formData)
      if (result.success) {
        setIsSuccess(true)
        setPopupMessage('Profile updated successfully')
      } else {
        setIsSuccess(false)
        setPopupMessage('Failed to update profile')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      setIsSuccess(false)
      setPopupMessage('An error occurred while updating profile')
    } finally {
      setIsLoading(false)
      setShowPopup(true)
    }
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleImport = async () => {
    if (!resumeFile) return

    setIsImporting(true)
    setImportProgress(0)

    const formData = new FormData()
    formData.append('resume', resumeFile)

    try {
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to parse resume')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const data = JSON.parse(chunk)

          if (data.progress) {
            setImportProgress(data.progress)
          }

          if (data.result) {
            setName(data.result.name || '')
            setPhoneNumber(data.result.phoneNumber || '')
            setEducation(data.result.highestEducation || '')
            setGpa(data.result.gpa || '')
            setExperience(data.result.totalYearsOfExperience || '')
            setSkills(data.result.skills || [])
            break
          }
        }
      }
    } catch (error) {
      console.error('Error parsing resume:', error)
      setIsSuccess(false)
      setPopupMessage('Failed to parse resume')
      setShowPopup(true)
    } finally {
      setIsImporting(false)
      setImportProgress(0)
    }
  }

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showPopup])

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
            <div className="flex items-center gap-4">
              <div className="flex-grow">
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
                type="button"
                onClick={handleImport}
                disabled={!resumeFile || isImporting}
                className="mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isImporting ? 'Importing...' : 'Import'}
              </button>
            </div>
            {isImporting && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${importProgress}%` }}></div>
              </div>
            )}
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
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-grow">
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">Highest Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-1/4">
                <label htmlFor="gpa" className="block text-sm font-medium text-gray-700">GPA</label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  step="0.01"
                  min="0"
                  max="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                  </span>
                ))}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Total Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                step="0.1"
                min="0"
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

          {user?.resumeUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Resume</h3>
              <div className="border border-gray-300 rounded-md overflow-hidden" style={{ height: 'calc(100vh - 400px)', maxHeight: '800px' }}>
                <PdfViewer url={user.resumeUrl} />
              </div>
            </div>
          )}
        </div>
      </main>

      {showPopup && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {popupMessage}
        </div>
      )}
    </div>
  )
}