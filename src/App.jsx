import { useState } from "react";
import { mockTrips } from "./data/mockTrips";

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
    <div>
      <h1>WanderMatch</h1>
      <p>Find your perfect weekend escape</p>

      <div>
        <label>Budget:</label>
        <select
          value={filters.budget}
          onChange={(e) => handleFilterChange("budget", e.target.value)}
        >
          <option value="">Any Budget</option>
          <option value="low">Low (£50-150)</option>
          <option value="medium">Medium (£150-350)</option>
          <option value="high">High (£350+)</option>
        </select>
      </div>
      <div>
        <label>Trip type: </label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="nature"> Nature</option>
          <option value="city">City</option>
          <option value="adventure">Adventure</option>
          <option value="beach">Beach</option>
          <option value="relaxation">Relaxation</option>
        </select>
      </div>
      <div>
        <label>Duration: </label>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
        >
          <option value="">Any Duration</option>
          <option value="day"> Day Trip</option>
          <option value="weekend">Weekend</option>
          <option value="week">Week</option>
        </select>
      </div>

      <div>
        <label>Mood (select multiple):</label>
        <div>
          {["peaceful", "active", "cultural", "scenic", "relaxing"].map(
            (mood) => (
              <button key={mood} onClick={() => toggleMood(mood)}>
                {filters.moods.includes(mood) ? "✓ " : ""}
                {mood}
              </button>
            )
          )}
        </div>
        <div>
          <button onClick={resetFilters}>🔄 Reset All Filters</button>
        </div>
      </div>

      <div>
        <h2>Found {filteredTrips.length} Trips:</h2>
        {filteredTrips.map((trip) => (
          <div key={trip.id}>
            <h3>{trip.name}</h3>
            <p>📍 {trip.location}</p>
            <p>{trip.description}</p>
            <p>💷 £{trip.estimatedCost}</p>
            <p>
              Type: {trip.type} | Budget: {trip.budget} | Duration:{" "}
              {trip.duration}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default wanderMatch;
