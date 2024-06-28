import React, { useEffect, useState} from 'react'
import Details from "../Components/Details"
import Form from '../Components/Form'

function Home() {
  const [workouts,setWorkouts] = useState(null)

useEffect(() => {
  const fetchWorkouts = async () => {
    try{
      const response = await fetch("/api/workout")
      const text = await response.text()
  
      if (!response.ok) {
        console.error(`Failed to fetch workouts: ${response.status} - ${text}`)
        return
      }  

      const json = JSON.parse(text)
      setWorkouts(json)

    }catch (error){
      console.error("An error occured", error)
    }
   
  }
  fetchWorkouts()
}, [])

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) => (
          <Details key={workout._id} workout={workout}/>
        ))}
      </div>
      <Form/>
    </div>
  )
}

export default Home