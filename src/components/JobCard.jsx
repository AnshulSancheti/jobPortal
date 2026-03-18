export default function JobCard({ job, isSaved, onSave, onRemove, onOpen }) {
  return (
    <div
      className={`job-card ${isSaved ? 'job-card--saved' : ''}`}
      onClick={() => onOpen(job)}
      style={{ cursor: 'pointer' }}
    >
      <div className="job-card-header">
        <h2 className="job-role">{job.role}</h2>
        {isSaved && <span className="saved-indicator">✓ Saved</span>}
      </div>
      <p className="job-meta">{job.company} &mdash; {job.location}</p>
      <p className="job-description">{job.description.slice(0, 120)}…</p>
      <div className="job-card-footer">
        {isSaved ? (
          <button className="btn btn-remove" onClick={(e) => { e.stopPropagation(); onRemove(job.id) }}>
            Remove
          </button>
        ) : (
          <button className="btn btn-save" onClick={(e) => { e.stopPropagation(); onSave(job.id) }}>
            Save Job
          </button>
        )}
      </div>
    </div>
  )
}
