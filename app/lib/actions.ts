'use server'
// app/lib/actions.ts
import { signIn,auth } from 'app/auth';
import { AuthError } from 'next-auth';
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import {updateUser} from '@/app/db'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
        await signIn('credentials', {
            redirectTo: '/job-board',
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          })
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

export async function getSession() {
    const session = await auth()
    return session
}

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to update your profile')
  }
  const name = formData.get('name') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const education = formData.get('education') as string
  const gpa = formData.get('gpa') as string
  const skills = JSON.parse(formData.get('skills') as string)
  const experience = formData.get('experience') as string
  const resumeFile = formData.get('resume') as File

  let updateData: {
    name?: string;
    phoneNumber?: string;
    education?: string;
    gpa?: number;
    skills?: string;
    experience?: number;
    resumeUrl?: string;
  } = {}

  // Update all values
  updateData.name = name
  updateData.phoneNumber = phoneNumber
  updateData.education = education
  updateData.gpa = gpa ? parseFloat(gpa) : undefined
  updateData.skills = JSON.stringify(skills)
  updateData.experience = experience ? parseFloat(experience) : undefined


  if (resumeFile && resumeFile.size > 0) {
    try {
      const { url } = await put(`resumes/${session.user.email}-${Date.now()}.pdf`, resumeFile, {
        access: 'public',
      })
      updateData.resumeUrl = url
    } catch (error) {
      console.error('Failed to upload resume:', error)
      throw new Error('Failed to upload resume. Please try again.')
    }
  }

  if (Object.keys(updateData).length > 0) {
    try {
      await updateUser(session.user.email, updateData)
    } catch (error) {
      console.error('Failed to update user profile:', error)
      throw new Error('Failed to update profile. Please try again.')
    }
  }

  revalidatePath('/profile')

  return { success: true }
}

import { signOut } from 'app/auth'

export async function signOutAction() {
  await signOut({ redirectTo: "/login", redirect: true })
}