'use server'
// app/lib/actions.ts
import { signIn } from 'app/auth';
import { AuthError } from 'next-auth';

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
