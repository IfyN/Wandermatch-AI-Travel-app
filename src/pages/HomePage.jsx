function HomePage({ filters, filteredTrips, onToggleMood }) {
  return (
    <>
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
    </>
  );
}
export default HomePage;
