import type { User, UserRow } from "./types";

export const mapUser = (row: UserRow): User => ({
	id: row.id,
	name: row.name,
	nickname: row.nickname,
	weight: row.weight,
	birthDate: row.birth_date,
});
