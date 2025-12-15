import { useParams, useNavigate } from 'react-router-dom';
import { mockTrips } from '../data/mockTrips';

function TripDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const trip = mockTrips.find(t => t.id === parseInt(id));
  
  if (!trip) {
    return (
      <main className="results-section">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>😕</h1>
          <h2 style={{ marginBottom: '16px' }}>Trip Not Found</h2>
          <p style={{ color: '#717171', marginBottom: '24px' }}>
            The trip you're looking for doesn't exist.
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: '#FF385C',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }
  
  return (
    <main className="trip-detail">
      <div className="detail-nav">
        <button 
          onClick={() => navigate('/')} 
          className="back-button"
          aria-label="Go back to trip results"
        >
          ← Back to results
        </button>
      </div>
      
      <div className="detail-hero">
        <img src={trip.image} alt={`${trip.name} hero image`} className="detail-image" />
      </div>
      
      <div className="detail-content">
        <div className="detail-header">
          <div>
            <h1 className="detail-title">{trip.name}</h1>
            <p className="detail-location">📍 {trip.location}</p>
          </div>
          <div className="detail-rating">
            <span aria-label="Rating 4.9 out of 5 stars">★ 4.9</span>
          </div>
        </div>
        
        <div className="detail-tags">
          <span className="detail-tag">{trip.type}</span>
          <span className="detail-tag">{trip.budget} budget</span>
          <span className="detail-tag">{trip.duration}</span>
        </div>
        
        <section className="detail-section">
          <h2>About this trip</h2>
          <p>{trip.description}</p>
        </section>
        
        <section className="detail-section">
          <h2>What you'll do</h2>
          <ul className="highlights-list">
            {trip.highlights.map((highlight, index) => (
              <li key={index}>✓ {highlight}</li>
            ))}
          </ul>
        </section>
        
        <section className="detail-section">
          <h2>Moods</h2>
          <div className="mood-tags">
            {trip.mood.map((mood, index) => (
              <span key={index} className="mood-tag">{mood}</span>
            ))}
          </div>
        </section>
        
        <footer className="detail-footer">
          <div className="price-section">
            <span className="price-label">Total price</span>
            <span className="price-value">£{trip.estimatedCost}</span>
          </div>
          <button 
            className="book-button"
            aria-label={`Book ${trip.name} for £${trip.estimatedCost}`}
          >
            Book this trip
          </button>
        </footer>
      </div>
    </main>
  );
}

export default TripDetailsPage;