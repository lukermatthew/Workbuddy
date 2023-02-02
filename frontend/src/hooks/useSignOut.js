import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useSignOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const signout = () => {
    // remove the user in the local storage
    localStorage.removeItem("user");

    // dispatch signout action
    dispatch({ type: "SIGNOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { signout };
};
