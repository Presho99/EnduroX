import React, { useState } from "react";

function Form() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    try {
      const response = await fetch('http://localhost:4001/api/workout', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const text = await response.text(); // Get the response as text

      try {
        const json = JSON.parse(text); // Try to parse it as JSON

        if (!response.ok) {
          setError(json.error);
        } else {
          setTitle('');
          setLoad('');
          setReps('');
          setError(null);
          console.log('new workout added', json);
        }
      } catch (err) {
        console.error('Response is not valid JSON:', text); // Log the response text
        setError('An error occurred');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add workout</h3>
      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Form;
