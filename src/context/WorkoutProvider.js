import { useState } from "react";
import { WorkoutContext } from "./WorkoutContext";

export default function WorkoutProvider({ children }) {
  const [workout, setWorkout] = useState([]);

  const fetchWorkout = async () => {
    const response = await fetch("https://fitness-app-api-j7a0.onrender.com/workouts/getMyWorkouts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    console.log(data);
    setWorkout(data.workouts); 
  };

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout, fetchWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}
