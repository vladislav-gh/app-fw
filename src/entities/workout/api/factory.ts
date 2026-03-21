import { getSupabaseRepository } from "@Shared/api/supabase";

import {
	createWorkoutExerciseRepository,
	createWorkoutExerciseSetRepository,
	createWorkoutRepository,
} from "./repository";

export const getWorkoutRepository = getSupabaseRepository(createWorkoutRepository);
export const getWorkoutExerciseRepository = getSupabaseRepository(createWorkoutExerciseRepository);
export const getWorkoutExerciseSetRepository = getSupabaseRepository(createWorkoutExerciseSetRepository);
