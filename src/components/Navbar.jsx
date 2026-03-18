export default function Navbar({ savedCount, viewMode, onViewChange }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Job Portal</h1>
      <div className="navbar-controls">
        <span className="saved-badge">Saved: {savedCount}</span>
        <button
          className={`view-btn ${viewMode === 'all' ? 'active' : ''}`}
          onClick={() => onViewChange('all')}
        >
          All Jobs
        </button>
        <button
          className={`view-btn ${viewMode === 'saved' ? 'active' : ''}`}
          onClick={() => onViewChange('saved')}
        >
          Saved Jobs
        </button>
      </div>
    </nav>
  )
}
