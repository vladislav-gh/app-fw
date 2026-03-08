"use server";

import type { UserUpdateDTO } from "../model";

import { getUserFromSupabase } from "../utils";
import { getUserRepository } from "./factory";

export async function getUser() {
	const user = await getUserFromSupabase();

	if (!user) {
		return null;
	}

	const repo = await getUserRepository();

	return repo.getById({ id: user.id });
}

export async function updateUser({ name, nickname, weight, birthDate }: UserUpdateDTO) {
	const user = await getUserFromSupabase();

	if (!user) {
		throw new Error("Unauthorized");
	}

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
