"use server";

import type { UserUpdateDTO } from "../model";

import { getSupabaseUser } from "@Shared/api/supabase";

import { getUserRepository } from "./factory";

export async function getUser() {
	const user = await getSupabaseUser();
	const repo = await getUserRepository();

	return repo.getById({ id: user.id });
}

export async function updateUser({ name, nickname, weight, birthDate }: UserUpdateDTO) {
	const user = await getSupabaseUser();
	const repo = await getUserRepository();

	return repo.update({
		id: user.id,
		payload: {
			name,
			nickname,
			weight,
			birth_date: birthDate,
		},
	});
}
