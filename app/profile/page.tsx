import { auth } from 'app/auth'
import ProfileContent from '@/components/ProfileContent'
import { getUser } from '@/app/db'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mb-4"></div>
      <div className="h-4 w-48 bg-gray-200 animate-pulse mb-2"></div>
      <div className="h-4 w-32 bg-gray-200 animate-pulse"></div>
    </div>
  )
}

async function ProfileData() {
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    redirect('/login')
  }

  const users = await getUser(session.user.email)

  if (!users || users.length === 0) {
    throw new Error('User not found')
  }

  const user = {
    id: users[0].id,
    name: users[0].name,
    email: users[0].email,
    phoneNumber: users[0].phoneNumber,
    education: users[0].education,
    gpa: users[0].gpa,
    skills: users[0].skills ? JSON.parse(users[0].skills) : [],
    experience: users[0].experience,
    resumeUrl: users[0].resumeUrl
  }

  return <ProfileContent user={user} />
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileData />
    </Suspense>
  )
}