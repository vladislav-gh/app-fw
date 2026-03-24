"use client";

import { useUser } from "@Entities/user";

export function Info() {
	const user = useUser();

	if (!user) {
		return;
	}

	return (
		<div className="flex flex-col gap-3">
			<div>id: {user.id}</div>
			{user.name && <div>Name: {user.name}</div>}
			{user.nickname && <div>Nickname: {user.nickname}</div>}
			{user.birthDate && <div>Birthday: {user.birthDate}</div>}
			{user.weight && <div>Weight: {user.weight}</div>}
		</div>
	);
}
