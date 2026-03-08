import type { Database } from "@Shared/api/supabase";

export type UserRow = Database["public"]["Tables"]["profiles"]["Row"];

export interface User {
	id: string;
	name?: string | null;
	nickname?: string | null;
	weight?: number | null;
	birthDate?: string | null;
}

export type UserUpdateDTO = Omit<Partial<User>, "id">;
