import React from "react";

function Header({ filters, onFilterChange, onReset }) {
  return (
    <header className="header">
      <h1 className="logo">🧳 WanderMatch</h1>
      <nav className="search-bar" aria-label="Trip filters">
        <div className="search-item">
          <label htmlFor="budget-select">Budget</label>
          <select
            id="budget-select"
            value={filters.budget}
            onChange={(e) => onFilterChange("budget", e.target.value)}
          >
            <option value="">Any</option>
            <option value="low">£50-150</option>
            <option value="medium">£150-350</option>
            <option value="high">£350+</option>
          </select>
        </div>

        <div className="search-divider" aria-hidden="true"></div>

        <div className="search-item">
          <label htmlFor="type-select">Type</label>
          <select
            id="type-select"
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
          >
            <option value="">Any</option>
            <option value="nature">Nature</option>
            <option value="city">City</option>
            <option value="adventure">Adventure</option>
            <option value="beach">Beach</option>
            <option value="relaxation">Relaxation</option>
          </select>
        </div>

        <div className="search-divider" aria-hidden="true"></div>

        <div className="search-item">
          <label htmlFor="duration-select">Duration</label>
          <select
            id="duration-select"
            value={filters.duration}
            onChange={(e) => onFilterChange("duration", e.target.value)}
          >
            <option value="">Any</option>
            <option value="day">Day Trip</option>
            <option value="weekend">Weekend</option>
            <option value="week">Week</option>
          </select>
        </div>

        <button
          className="search-button"
          type="button"
          aria-label="Search trips"
        >
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
        </button>
      </nav>

      <button className="reset-button" onClick={onReset} type="button">
        Reset
      </button>
    </header>
  );
}
export default Header;
