import { auth } from 'app/auth'
import JobBoard from '@/components/JobBoard'

export default async function JobBoardPage() {
  const session = await auth()

  return <JobBoard session={session} />
}