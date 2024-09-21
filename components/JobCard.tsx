export default function JobCard({ job }) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        <p className="mt-2 text-sm text-gray-600">{job.company}</p>
        <p className="text-sm text-gray-600">{job.location}</p>
        <button 
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          //onClick={() => console.log(`Applied to ${job.title}`)}
        >
          Apply
        </button>
      </div>
    )
  }