import { getSupabaseRepository } from "@Shared/api/supabase";

import { createUserRepository } from "./repository";

export const getUserRepository = getSupabaseRepository(createUserRepository);
