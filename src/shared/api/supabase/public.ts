import type { Database } from "./types";

import { createClient } from "@supabase/supabase-js";

import { SUPABASE_KEY, SUPABASE_URL } from "./config";

export const createClientPublic = () => createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
