import { useState } from 'react'

export default function JobModal({ job, isSaved, onSave, onRemove, onClose }) {
  const [applied, setApplied] = useState(false)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-role">{job.role}</h2>
        <p className="modal-meta">{job.company} — {job.location}</p>
        <p className="modal-description">{job.description}</p>
        <div className="modal-footer">
          {isSaved ? (
            <button className="btn btn-remove" onClick={() => onRemove(job.id)}>
              Remove
            </button>
          ) : (
            <button className="btn btn-save" onClick={() => onSave(job.id)}>
              Save Job
            </button>
          )}
          <button className="btn btn-apply" onClick={() => setApplied(true)} disabled={applied}>
            {applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  )
}
