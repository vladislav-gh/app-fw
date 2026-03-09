import type {
	Workout,
	WorkoutExercise,
	WorkoutExerciseRowWithSets,
	WorkoutExerciseSet,
	WorkoutExerciseSetRow,
	WorkoutRowWithExercises,
} from "./types";

export const mapWorkoutExerciseSet = (row: WorkoutExerciseSetRow): WorkoutExerciseSet => ({
	id: row.id,
	reps: row.reps,
	weight: row.weight,
});

export const mapWorkoutExercise = (row: WorkoutExerciseRowWithSets): WorkoutExercise => ({
	id: row.id,
	name: row.name,
	categories:
		row.categories?.map(category => {
			let id = null;
			let name = "";

			if (typeof category === "object" && category) {
				if ("id" in category && typeof category.id === "string") {
					id = category.id;
				}

				if ("name" in category && typeof category.name === "string") {
					name = category.name;
				}
			}

			return {
				id,
				name,
			};
		}) ?? [],
	sets: row.workout_exercise_sets?.map(mapWorkoutExerciseSet) ?? [],
});

export const mapWorkout = (row: WorkoutRowWithExercises): Workout => {
	const exercises = row.workout_exercises?.map(mapWorkoutExercise) ?? [];
	const categories = Array.from(
		new Set(exercises.flatMap(exercise => exercise.categories.map(category => category.name))),
	);

	return {
		id: row.id,
		date: row.date,
		duration: row.duration,
		userWeight: row.user_weight,
		notes: row.notes,
		categories,
		exercises,
	};
};

export const mapWorkouts = (rows: WorkoutRowWithExercises[]): Workout[] => rows.map(mapWorkout);
