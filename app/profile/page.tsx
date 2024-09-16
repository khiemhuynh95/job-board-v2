import { auth } from 'app/auth'
import ProfileContent from '@/components/ProfileContent'
import { getUser } from '@/app/db'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    redirect('/login')
  }

  const users = await getUser(session.user.email)

  if (!users || users.length === 0) {
    throw new Error('User not found')
  }

  const user = {
    'name': users[0].name,
    'email': users[0].email,
    'resumeurl': users[0].resumeUrl
  }

  return <ProfileContent user={user} />
}