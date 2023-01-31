import { useParams } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const id = useParams();

  const handleClickDelete = async (id) => {
    const response = await fetch("/api/workouts/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleClickEdit = async (id) => {
    console.log(id);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div
        className="edit-action material-symbols-outlined"
        onClick={() => handleClickEdit(workout._id)}
      >
        edit
      </div>
      <div
        className="delete-action material-symbols-outlined"
        // onClick={handleClickDelete}
        onClick={() => handleClickDelete(workout._id)}
      >
        delete
      </div>
    </div>
  );
};

export default WorkoutDetails;
