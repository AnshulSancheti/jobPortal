import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import SearchBar from './components/SearchBar.jsx'
import JobCard from './components/JobCard.jsx'
import JobModal from './components/JobModal.jsx'
import jobsData from './data/jobs.js'
import './App.css'

export default function App() {
  const [jobs, setJobs] = useState([])
  const [searchText, setSearchText] = useState('')
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const stored = localStorage.getItem('savedJobs')
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })
  const [viewMode, setViewMode] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)

  useEffect(() => {
    setJobs(jobsData)
    setLoading(false)
  }, [])

  const handleSave = (id) => setSavedJobs((prev) => new Set([...prev, id]))
  const handleRemove = (id) =>
    setSavedJobs((prev) => {
      const s = new Set(prev)
      s.delete(id)
      return s
    })

  const filteredJobs = jobs
    .filter((j) => j.role.toLowerCase().includes(searchText.toLowerCase()))
    .filter((j) => viewMode === 'all' || savedJobs.has(j.id))

  return (
    <div className="app">
      <Navbar
        savedCount={savedJobs.size}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />
      <main className="main-content">
        <SearchBar value={searchText} onChange={setSearchText} />
        {loading && <p className="status-msg">Loading jobs...</p>}
        {error && <p className="status-msg status-error">{error}</p>}
        {!loading && !error && filteredJobs.length === 0 && (
          <p className="status-msg">No jobs found.</p>
        )}
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.has(job.id)}
              onSave={handleSave}
              onRemove={handleRemove}
              onOpen={setSelectedJob}
            />
          ))}
        </div>
      </main>
      {selectedJob && (
        <JobModal
          job={selectedJob}
          isSaved={savedJobs.has(selectedJob.id)}
          onSave={handleSave}
          onRemove={handleRemove}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  )
}
