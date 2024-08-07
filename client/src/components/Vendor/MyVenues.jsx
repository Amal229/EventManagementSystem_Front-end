import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetAllVenue } from '../../services/Venue'
import VenueCard from './VenueCard'
import '../../App.css'

const MyVenue = ({ user }) => {
  const [venues, setVenues] = useState([])

  const removeVenue = (venueId) => {
    setVenues(venues.filter((venue) => venue._id !== venueId))
  }

  useEffect(() => {
    if (user) {
      const getVendorVenues = async () => {
        const data = await GetAllVenue(user.id)
        setVenues(data)
      }
      getVendorVenues()
    }
  }, [user])

  return (
    <div className="Venues">
      <h1>My Venues</h1>
      <div className="Button-delete-venue">
        <Link to={`/venues/newvenue`}>
          <button className="new-venue-btn"> Add Venue</button>
        </Link>
      </div>
      <div className="venue-container">
        {venues.length !== 0 ? (
          venues.map((venue) => (
            <VenueCard
              path={`/venues/${venue._id}`}
              key={venue._id}
              venue={venue}
              onDelete={removeVenue}
            ></VenueCard>
          ))
        ) : (
          <h3>No Venues Yet</h3>
        )}
      </div>
      
    </div>
  )
}

export default MyVenue
