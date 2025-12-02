import { useState } from "react";
import { mockTrips } from "./data/mockTrips";
import "./App.css";

function wanderMatch() {
  const [filters, setFilters] = useState({
    budget: "",
    type: "",
    duration: "",
    moods: [],
  });

  const [filteredTrips, setFilteredTrips] = useState(mockTrips);

  console.log("Current filters:", filters);

  // This does the actual filtering with given filter values
  const filterTripsWithValues = (filterValues) => {
    let results = mockTrips;

    if (filterValues.budget) {
      results = results.filter((trip) => trip.budget === filterValues.budget);
    }

    if (filterValues.type) {
      results = results.filter((trip) => trip.type === filterValues.type);
    }

    if (filterValues.duration) {
      results = results.filter(
        (trip) => trip.duration === filterValues.duration
      );
    }

    if (filterValues.moods.length > 0) {
      results = results.filter((trip) =>
        filterValues.moods.some((mood) => trip.mood.includes(mood))
      );
    }

    setFilteredTrips(results);
  };

  // This handles any filter change
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    filterTripsWithValues(newFilters); // Filter with NEW values
  };

  const resetFilters = () => {
    const InitialFilter = {
      budget: "",
      type: "",
      duration: "",
      moods: [],
    };
    setFilters(InitialFilter);
    filterTripsWithValues(InitialFilter); // Reset to initial filters
  };

  const toggleMood = (mood) => {
    let newMoods;

    if (filters.moods.includes(mood)) {
      // Remove mood
      newMoods = filters.moods.filter((m) => m !== mood);
    } else {
      // Add mood
      newMoods = [...filters.moods, mood];
    }

    handleFilterChange("moods", newMoods);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">🧳 WanderMatch</h1>
        <nav className="search-bar" aria-label="Trip filters">
          <div className="search-item">
            <label htmlFor="budget-select">Budget</label>
            <select
              id="budget-select"
              value={filters.budget}
              onChange={(e) => handleFilterChange("budget", e.target.value)}
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
              onChange={(e) => handleFilterChange("type", e.target.value)}
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
              onChange={(e) => handleFilterChange("duration", e.target.value)}
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

        <button className="reset-button" onClick={resetFilters} type="button">
          Reset
        </button>
      </header>

      <section className="mood-section" aria-labelledby="mood-heading">
        <h2 id="mood-heading" className="visually-hidden">
          Filter by mood
        </h2>
        <label>Mood:</label>
        <div className="mood-buttons" role="group" aria-label="Mood options">
          {["peaceful", "active", "cultural", "scenic", "relaxing"].map(
            (mood) => (
              <button
                key={mood}
                className={
                  filters.moods.includes(mood) ? "mood-btn active" : "mood-btn"
                }
                onClick={() => toggleMood(mood)}
                type="button"
                aria-pressed={filters.moods.includes(mood)}
              >
                {filters.moods.includes(mood) ? "✓ " : ""}
                {mood}
              </button>
            )
          )}
        </div>
      </section>

      <main className="results-section">
        <h2 className="results-heading">
          {filteredTrips.length === 0
            ? "No trips found"
            : `${filteredTrips.length} ${
                filteredTrips.length === 1 ? "trip" : "trips"
              } available`}
        </h2>

        {filteredTrips.length === 0 ? (
          <p className="no-results">
            Try adjusting your filters to see more options
          </p>
        ) : (
          <div className="trip-grid">
            {filteredTrips.map((trip) => (
              <article key={trip.id} className="trip-card">
                <div className="card-image-container">
                  <img
                    src={trip.image}
                    alt={`${trip.name} in ${trip.location}`}
                    className="card-image"
                  />
                </div>

                <div className="card-content">
                  <header className="card-header">
                    <h3 className="card-title">{trip.name}</h3>
                    <span
                      className="card-rating"
                      aria-label="Rating: 4.9 out of 5"
                    >
                      ★ 4.9
                    </span>
                  </header>

                  <p className="card-location">{trip.location}</p>
                  <p className="card-description">{trip.description}</p>

                  <footer className="card-footer">
                    <p className="card-price">
                      <span className="price-amount">
                        £{trip.estimatedCost}
                      </span>
                      <span className="price-label"> total</span>
                    </p>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default wanderMatch;
