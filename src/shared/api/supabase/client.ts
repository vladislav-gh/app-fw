import type { Database } from "./types";

import { createBrowserClient } from "@supabase/ssr";

import { SUPABASE_KEY, SUPABASE_URL } from "./config";

export const createClientBrowser = () => createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);
