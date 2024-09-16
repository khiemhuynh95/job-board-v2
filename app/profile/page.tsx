import { auth } from 'app/auth'
import Link from 'next/link'

export default async function ProfilePage() {
  const session = await auth()

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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{session?.user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{session?.user?.name || 'Not provided'}</p>
            </div>
            {/* Add more profile fields as needed */}
          </div>
        </div>
      </main>
    </div>
  )
}


// 'use client'
// import { auth } from 'app/auth'
// import Link from 'next/link'
// import { useState, FormEvent, ChangeEvent } from 'react'

// export default  function ProfilePage() {


//   const [name, setName] = useState(session?.user?.name || '')
//   const [resumeFile, setResumeFile] = useState<File | null>(null)

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     // Here you would typically send this data to your backend
//     // For this example, we'll just update the session
//     //await update({ name })
//     alert('Profile updated!')
//   }

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setResumeFile(e.target.files[0])
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
//           <Link href="/job-board" className="text-blue-500 hover:text-blue-600">
//             Back to Job Board
//           </Link>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Profile</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input 
//                 type="email" 
//                 id="email" 
//                 value={session?.user?.email || ''} 
//                 disabled 
//                 className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input 
//                 type="text" 
//                 id="name" 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
//               <input 
//                 type="file" 
//                 id="resume" 
//                 onChange={handleFileChange}
//                 accept=".pdf,.doc,.docx"
//                 className="mt-1 block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               />
//               {resumeFile && (
//                 <p className="mt-2 text-sm text-gray-500">
//                   File selected: {resumeFile.name}
//                 </p>
//               )}
//             </div>
//             <div>
//               <button 
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Update Profile
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }