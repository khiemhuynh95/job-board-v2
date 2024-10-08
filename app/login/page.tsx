'use client'

import Link from 'next/link'
import { Form } from 'app/form'
import { SubmitButton } from 'app/submit-button'
import { authenticate } from "@/app/lib/actions"
import { useFormState } from 'react-dom'

export default function Login() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined)

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form action={formAction}>
          {errorMessage && (
            <div className="px-4 py-3">
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  )
}