import { getSupabaseRepository } from "@Shared/api/supabase";

import { createExerciseRepository } from "./repository";

export const getExerciseRepository = getSupabaseRepository(createExerciseRepository);
