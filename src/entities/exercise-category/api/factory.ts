import { getSupabaseRepository } from "@Shared/api/supabase";

import { createExerciseCategoryRepository } from "./repository";

export const getExerciseCategoryRepository = getSupabaseRepository(createExerciseCategoryRepository);
