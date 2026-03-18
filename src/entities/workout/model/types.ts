import type { Database } from "@Shared/api/supabase";

export type WorkoutExerciseSetRow = Database["public"]["Tables"]["workout_exercise_sets"]["Row"];

export type WorkoutExerciseRow = Database["public"]["Tables"]["workout_exercises"]["Row"];

export interface WorkoutExerciseRowWithSets extends WorkoutExerciseRow {
	workout_exercise_sets?: WorkoutExerciseSetRow[];
}

export type WorkoutRow = Database["public"]["Tables"]["workouts"]["Row"];

export interface WorkoutRowWithExercises extends WorkoutRow {
	workout_exercises?: WorkoutExerciseRowWithSets[];
}

export interface WorkoutExerciseSet {
	id: string;
	reps: number;
	weight?: number | null;
}

export interface WorkoutExerciseCategory {
	id?: string | null;
	name: string;
}

export interface WorkoutExercise {
	id: string;
	name: string;
	categories: WorkoutExerciseCategory[];
	sets: WorkoutExerciseSet[];
}

export interface Workout {
	id: string;
	date: string;
	duration?: number | null;
	userWeight?: number | null;
	notes?: string | null;
	categories: string[];
	exercises: WorkoutExercise[];
}

export interface WorkoutGetDTO {
	workoutId: string;
}

export interface WorkoutCreateDTO {
	date?: string;
	duration?: number | null;
	userWeight?: number | null;
	notes?: string | null;
}

export interface WorkoutUpdateDTO extends Partial<WorkoutCreateDTO> {
	workoutId: string;
}

export interface WorkoutDeleteDTO {
	workoutId: string;
}

export interface WorkoutExerciseCreateDTO {
	workoutId: string;
	name: string;
	categories: WorkoutExerciseCategory[];
}

export interface WorkoutExerciseUpdateDTO extends Partial<Omit<WorkoutExerciseCreateDTO, "workoutId">> {
	exerciseId: string;
}

export interface WorkoutExerciseDeleteDTO {
	exerciseId: string;
}

export interface WorkoutExerciseSetCreateDTO {
	exerciseId: string;
	reps: number;
	weight?: number | null;
}

export interface WorkoutExerciseSetUpdateDTO extends Partial<Omit<WorkoutExerciseSetCreateDTO, "exerciseId">> {
	setId: string;
}

export interface WorkoutExerciseSetDeleteDTO {
	setId: string;
}
