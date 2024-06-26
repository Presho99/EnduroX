import React from 'react'

function Details({ workout }) {
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{new Date(workout.createdAt).toLocaleDateString()}</p> {/* Format the date */}
    </div>
  )
}

export default Details
