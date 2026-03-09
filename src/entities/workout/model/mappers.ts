import type {
	Workout,
	WorkoutExercise,
	WorkoutExerciseRowWithSets,
	WorkoutExerciseSet,
	WorkoutExerciseSetRow,
	WorkoutRowWithExercises,
} from "./types";

export const mapWorkout = (row: WorkoutRowWithExercises): Workout => ({
	id: row.id,
	date: row.date,
	duration: row.duration,
	userWeight: row.user_weight,
	notes: row.notes,
	categories: [],
	exercises: row.workout_exercises?.map(mapWorkoutExercise) ?? [],
});

export const mapWorkouts = (rows: WorkoutRowWithExercises[]): Workout[] => rows.map(mapWorkout);

export const mapWorkoutExercise = (row: WorkoutExerciseRowWithSets): WorkoutExercise => ({
	id: row.id,
	name: "",
	categories: [],
	sets: row.workout_exercise_sets?.map(mapWorkoutExerciseSet) ?? [],
});

export const mapWorkoutExerciseSet = (row: WorkoutExerciseSetRow): WorkoutExerciseSet => ({
	id: row.id,
	reps: row.reps,
	weight: row.weight,
});
