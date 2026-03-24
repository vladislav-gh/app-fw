"use server";

import { updateUser } from "@Entities/user";

export async function updateUserAction(_prevState: unknown, formData: FormData) {
	const name = formData.get("name")?.toString().trim();
	const nickname = formData.get("nickname")?.toString().trim();
	const birthDate = formData.get("birthDate")?.toString().trim();
	const weight = formData.get("weight")?.toString().trim();

	const result = await updateUser({
		name,
		nickname,
		birthDate: birthDate ? birthDate : null,
		weight: weight ? Number(weight) : undefined,
	});

	return { success: true, data: result };
}
