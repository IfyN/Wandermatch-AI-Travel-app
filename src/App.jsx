import {useState} from 'react';

function App() {

  const [filters, setFilters] = useState({
    budget: '',
    type: '',
    duration: '',
    moods: []
  });

  console.log('Current filters:', filters); 

  return (
  <div>
    <h1>WanderMatch</h1>
    <p>Find your perfect weekend escape</p>

    <div>
      <label>Budget:</label>
      <select 
  value={filters.budget} 
  onChange={(e)=> setFilters({ ...filters, budget: e.target.value})}>
        <option value="">Any Budget</option>
        <option value="low">Low (£50-150)</option>
        <option value="medium">Medium (£150-350)</option>
        <option value="high">High (£350+)</option>
      </select>
    </div>
  </div>
)
}

export default App;