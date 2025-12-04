import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { mockTrips } from "./data/mockTrips";
import "./App.css";

function App() {
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
      <Header
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips/:id" element={<TripDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
